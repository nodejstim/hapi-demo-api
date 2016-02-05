'use strict';

const API = require('../lib');

const Config = require('../conf/test');


exports.init = function (callback) {

    API.init(Config, (server) => {

        callback(server, (done) => {

            server.stop({ timeout: 1 }, done);
        });
    });
};
