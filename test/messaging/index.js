'use strict';

const Code = require('code');
const Lab = require('lab');
const Nes = require('nes');

const Setup = require('../setup');


const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;



describe('POST /message', () => {

    it('adds a message', (done) => {

        Setup.init((server, close) => {

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

                close(done);
            });
        });
    });

    it('adds a message and receives a notification', (done) => {

        Setup.init((server, close) => {

            const client = new Nes.Client(server.info.uri);

            client.connect((err) => {

                expect(err).to.not.exist();

                let result;
                let update;

                const next = function () {

                    if (result && update) {

                        expect(result).to.equal(update.id);

                        close(done);
                    }
                };

                const onupdate = function (data) {

                    expect(data).to.exist();

                    update = data;

                    next();
                };

                client.subscribe('/messages', onupdate, (err) => {

                    expect(err).to.not.exist();

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

                        result = res.result;

                        next();
                    });
                });
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

        Setup.init((server, close) => {

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

                close(done);
            });
        });
    });
});



describe('subscription', () => {

    it('logs database changefeed errors', { parallel: false }, (done) => {

        const ext = [{
            type: 'onPreStart',
            method: function (server, next) {

                server.app.db.disable('messages', 'changes', { updates: true });

                return next();
            }
        }];

        Setup.init({ ext: ext }, (server, close) => {

            server.on('log', (event, tags) => {

                expect(event.tags).to.deep.equal(['error']);
                close(done);
            });
        });
    });

});

