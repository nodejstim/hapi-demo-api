'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');

const Setup = require('./setup');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('starts server and returns hapi server object', (done) => {

    Setup.init((server) => {

        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});
