'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const API = require('../lib');

const Config = require('../conf/test');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('starts server and returns hapi server object', (done) => {

    API.init(Config, (server) => {

        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('adds a message', (done) => {

    API.init(Config, (server) => {

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

            server.stop(done);
        });
    });
});

it('errors on invalid payload', (done) => {

    API.init(Config, (server) => {

        const options = {
            method: 'POST',
            url: '/message',
            payload: {
                from: 'A User'
            }
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(400);
            expect(res.result.validation).to.exist();

            server.stop(done);
        });
    });
});

it('errors on database error', (done) => {

    API.init(Config, (server) => {

        server.app.db.disable('messages', 'insert');

        const options = {
            method: 'POST',
            url: '/message',
            payload: {
                from: 'A User',
                msg: 'Hello'
            }
        };

        server.inject(options, (res) => {

            expect(res.statusCode).to.equal(500);

            server.stop(done);
        });
    });
});

