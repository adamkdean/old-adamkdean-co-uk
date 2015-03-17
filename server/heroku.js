var _ = require('lodash'),
    config = require('./config'),
    Heroku = require('heroku-client'),
    heroku = new Heroku({ token: config.HEROKU_API_TOKEN });

var self = {

    ready: false,
    version: {},
    versionNo: 0,

    init: function() {
        console.log('[heroku] init begin');
        if (config.HEROKU_API_TOKEN) {
            console.log('[heroku] api token found, getting release info');
            self.getRelease();
            self.ready = true;
            console.log('[heroku] done, version no: %s', self.versionNo);
        }
    },

    getRelease: function() {
        console.log('[heroku] getting version...');
        heroku.get('/apps/' + config.HEROKU_APP_NAME + '/releases', function (err, data) {
            for(var i = 0; i < data.length; i++) {
                if (data[i].version > self.versionNo) {
                    self.version = data[i];
                    self.versionNo = data[i].version;
                }
            }
        });
    },

    getReleaseString: function() {
        if (typeof self.version.description !== 'undefined') {
            if (_.startsWith(self.version.description, 'Deploy')) {
                var sha = self.version.description.split(' ')[1],
                    commitUri = config.GITHUB_REPO_URL + '/commit/' + sha,
                    commitLink = '<a href="' + commitUri + '">' + sha + '</a>';
                return "v" + self.versionNo + ' (' + commitLink + ')';
            } else {
                return 'v' + self.versionNo + ' (' + self.version.description + ')';
            }
        } else {
            return '';
        }
    }

};

module.exports = exports = self;
