'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const API = require('../lib');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('starts server and returns hapi server object', (done) => {

    API.init((server) => {

        expect(server).to.be.instanceof(Hapi.Server);
        server.stop(done);
    });
});
