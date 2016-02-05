'use strict';

// Load modules

const Hapi = require('hapi');
const Hoek = require('hoek');
const Penseur = require('penseur');
const Joi = require('joi');


const internals = {};


exports.init = function (opts, next) {

    const server = new Hapi.Server();

    server.connection(opts.http);

    const db = new Penseur.Db('hapidemo', opts.db);

    server.app.db = db;
    server.bind({ db: db });

    server.route({ method: 'POST', path: '/message', config: internals.post });

    db.establish(['messages'], (err) => {

        Hoek.assert(!err, err);

        server.start((err) => {

            Hoek.assert(!err, err);

            return next(server);
        });
    });
};

internals.post = {
    description: 'insert message',
    validate: {
        payload: {
            from: Joi.string().required(),
            msg: Joi.string().required()
        }
    },
    handler: function (request, reply) {

        this.db.messages.insert(request.payload, reply);
    }
};
