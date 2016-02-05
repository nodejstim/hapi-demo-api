'use strict';

const Async = require('async');
const Hapi = require('hapi');
const Penseur = require('penseur');
const Nes = require('nes');

const Messaging = require('./messaging');


exports.init = function (opts, callback) {

    const server = new Hapi.Server();
    server.connection(opts.http);

    const db = new Penseur.Db('hapidemo', opts.db);
    server.app.db = db;

    Async.waterfall([
        (next) => db.establish(Messaging.requiredTables(), next),

        (next) =>  server.register(Nes, next),
        (next) =>  server.register(Messaging, next)

    ], (err) => {

        callback(err, server);
    });
};
