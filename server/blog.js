var _ = require('lodash'),
    S = require('string'),
    fs = require('fs'),
    yaml = require('js-yaml'),
    async = require('async'),
    searchIndex = require('search-index'),
    config = require('./config');

var cachedBlogPosts = {};

var updateInterval = config.CACHE_UPDATE_INTERVAL,
    updateObject;

var startUpdateCycle = function(interval) {
    updateInterval = interval || updateInterval;
    updateCycle();
};

var stopUpdateCycle = function() {
    clearTimeout(updateObject);
};

var updateCycle = function() {
    updateAsync(function() {
        updateObject = setTimeout(updateCycle, updateInterval);
    });
};

var updateAsync = function(callback) {
    var validFilenames = [],
        allFilenames = fs.readdirSync(config.POST_DIR);

    allFilenames.forEach(function(element, index, array) {
        // Format: YYYY-MM-DD-HH-mm-ss
        if (element.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})-([0-9]{2})-([0-9]{2})-([0-9]{2})-([a-z0-9-.]+)$/i)) {
            validFilenames.push(config.POST_DIR + '/' + element);
        } else {
            console.log('invalid blog post file name', element);
        }
    });

    async.map(validFilenames, readFileAsync, function(err, readResults) {
        if (err !== undefined) {
            console.log('Error reading blog files:', err);
            return;
        }

        console.log('updating cache with %d blog posts', readResults.length);

        parseRawDataAsync(readResults, function(posts) {
            generateIndexesAsync(posts, function(indexes) {

                // update the cache object with the new object
                cachedBlogPosts = {
                    all: posts,
                    slugIndex: indexes.slugIndex,
                    tagIndex: indexes.tagIndex,
                    tagCountArray: indexes.tagCountArray
                };

                console.log('generated tag index with %d tags', _.size(cachedBlogPosts.tagIndex));
                console.log('generated slug index with %d slugs', _.size(cachedBlogPosts.slugIndex));
                console.log('updated cache with %d blog posts', cachedBlogPosts.all.length);

                callback();
            });
        });
    });
};

var readFileAsync = function(filename, callback) {
    fs.readFile(filename, 'utf8', callback);
};

var parseRawDataAsync = function(data, callback) {
    var re = /---[\n\r]+([\s\S]*)[\n\r]+---[\n\r]+([\s\S]*)/,
        posts = [];

    for(var i = 0; i < data.length; i++) {
        var bits = re.exec(data[i]),
            metadata = yaml.safeLoad(bits[1] || ''),
            content = bits[2] || '';

        // *** DEBUG REMOVE ***
        if (i < 5) {
            posts.push({
                original: data[i],
                metadata: metadata,
                content: content
            });
        }
    }

    callback(posts);
};

// Indexes vs Indices (http://grammarist.com/usage/indexes-indices/)
// " It's true that indices is the plural of index in Latin, but index is an English word when
//   English speakers use it so we can pluralize it according to the conventions of English. "
var generateIndexesAsync = function(posts, callback) {
    var slugIndex = {},
        tagIndex = {},
        tagCountIndex = {}, // used for tmp storage to make tagCountArray
        tagCountArray = [], // this is the list we're really interested in
        batch = _.clone(posts, true); // we don't want it messing with our chi

    // initialise the search index
    searchIndex.empty(function() {
        console.log('info: emptied search index, adding documents...');
        searchIndex.add({'batchName': 'blogPosts', 'filters': ['metadata']}, batch, function(err) {
            if (err) console.error('Error indexing blogPosts');
        });
    });

    // reverse the posts so we get newest first
    posts = posts.reverse();

    for(var i = 0; i < posts.length; i++) {
        var post = posts[i],
            meta = post.metadata || {},
            tags = meta.tags || [],
            slug = meta.slug || '';

        for(var j = 0; j < tags.length; j++) {
            var tag = tags[j],
                tagExists = tag in tagIndex,
                postUnique = !_.contains(tagIndex[tag], post);

            if (tagExists && postUnique) {
                tagIndex[tag].push(post);
                tagCountIndex[tag].count++;
            } else if (!tagExists) {
                tagIndex[tag] = new Array(post);
                tagCountIndex[tag] = {
                    count: 1
                };
            }
        }

        // only index this post if the slug is unique and hasn't already been used
        if (!(slug in slugIndex)) {
            slugIndex[slug] = post;
        }
    }

    // move the tags into an array
    for(var key in tagCountIndex) {
        tagCountArray.push({
            name: key,
            count: tagCountIndex[key].count
        });
    }

    callback({
        slugIndex: slugIndex,
        tagIndex: tagIndex,
        tagCountArray: tagCountArray
    });
};

var getPosts = function(options, callback) {
    // options (object):
    //  tag: returns all blog posts that are tagged with said tag
    //  slug: returns single blog posts with this slug
    //  search: returns search results

    if (options && 'tag' in options) {
        return (options.tag in cachedBlogPosts.tagIndex)
            ? cachedBlogPosts.tagIndex[options.tag]
            : null;
    }

    if (options && 'slug' in options) {
        return (options.slug in cachedBlogPosts.slugIndex)
            ? cachedBlogPosts.slugIndex[options.slug]
            : null;
    }

    if (options && 'search' in options) {
        var query = { "query": { "*": [options.search] } };

        searchIndex.search(query, function(err, results) {
            var posts = [];
            for(var i = 0; i < data.hits.length; i++) {
                posts.push(data.hits[i].document);
            }
            return posts;
        });
    }

    // default to all blog posts
    return cachedBlogPosts.all;
};

var getTags = function(options) {
    var tags = cachedBlogPosts.tagCountArray;

    if (options && 'sort' in options) {
        if (options.sort === 'asc') tags = _.sortBy(cachedBlogPosts.tagCountArray, 'count');
        else if (options.sort === 'desc') tags = _.sortBy(cachedBlogPosts.tagCountArray, 'count').reverse();
    }

    return tags;
};

module.exports = exports = {
    startUpdateCycle: startUpdateCycle,
    stopUpdateCycle: stopUpdateCycle,
    updateAsync: updateAsync,
    getPosts: getPosts,
    getTags: getTags
};
