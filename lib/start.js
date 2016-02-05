'use strict';

const Hoek = require('hoek');

const API = require('./');
const Config = require('../conf');


// Declare internals

const internals = {};


internals.start = function () {

    API.init(Config, (err, server) => {

        Hoek.assert(!err, err);

        server.start((err) => {

            Hoek.assert(!err, err);

            console.log('Server started at: ' + server.info.uri);
        });
    });
};

internals.start();
