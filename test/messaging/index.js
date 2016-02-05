'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');

const Setup = require('../setup');

// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;


it('adds a message', (done) => {

    Setup.init((server) => {

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

    Setup.init((server, close) => {

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

            close(done);
        });
    });
});

it('errors on database error', (done) => {

    Setup.init((server) => {

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

