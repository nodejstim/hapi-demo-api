'use strict';

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');

const Setup = require('./setup');


const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;


describe('server', () => {

    it('starts server and returns hapi server object', (done) => {

        Setup.init((server, close) => {

            expect(server).to.be.instanceof(Hapi.Server);

            close(done);
        });
    });
});
