'use strict';

const Server = require('./index');


// Declare internals

const internals = {};


internals.start = function () {

    Server.init((server) => {

        console.log('Server started at: ' + server.info.uri);
    });
};

internals.start();
