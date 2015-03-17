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
        return "v" + self.versionNo + ' (' + self.version.description + ')';
    }

};

module.exports = exports = self;
