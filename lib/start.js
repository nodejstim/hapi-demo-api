'use strict';

const Server = require('./index');

const Config = require('../conf');


// Declare internals

const internals = {};


internals.start = function () {

    Server.init(Config, (server) => {

        console.log('Server started at: ' + server.info.uri);
    });
};

internals.start();
