'use strict';

const Hoek = require('hoek');

const API = require('../lib');
const Config = require('../conf/test');


exports.init = function (options, callback) {

    if (typeof options === 'function') {
        callback = options;
    }

    API.init(Config, (err, server) => {

        Hoek.assert(!err, err);

        if (options.ext) {
            server.ext(options.ext);
        }

        server.start((err) => {

            Hoek.assert(!err, err);

            callback(server, (done) => {

                server.stop({ timeout: 1 }, done);
            });
        });
    });
};
