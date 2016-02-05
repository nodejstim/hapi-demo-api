'use strict';

// Load modules

const Hapi = require('hapi');
const Hoek = require('hoek');
const Penseur = require('penseur');

const Messaging = require('./messaging');


exports.init = function (opts, next) {

    const server = new Hapi.Server();
    server.connection(opts.http);

    const db = new Penseur.Db('hapidemo', opts.db);
    server.app.db = db;

    db.establish(Messaging.requiredTables(), (err) => {

        Hoek.assert(!err, err);

        server.register(Messaging, (err) => {

            Hoek.assert(!err, err);

            server.start((err) => {

                Hoek.assert(!err, err);

                return next(server);
            });
        });
    });
};