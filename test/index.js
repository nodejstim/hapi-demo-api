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

it('adds a message', (done) => {

    API.init((server) => {

        const options = {
            method: 'POST',
            url: '/message',
            payload: {
                from: 'A User',
                msg: 'Hello'
            }
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.result).to.exist();
        });
    });
});

