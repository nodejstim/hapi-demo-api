'use strict';

// Load modules

const Hapi = require('hapi');
const Hoek = require('hoek');
const Penseur = require('penseur');
const Joi = require('joi');


const internals = {};


exports.init = function (next) {

    const server = new Hapi.Server();

    server.connection({
        host: 'localhost',
        port: 3000
    });

    const db = new Penseur.Db('hapidemo', {
        host: '192.168.1.136',
        port: 28015
    });

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
