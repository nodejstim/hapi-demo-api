'use strict';

const Joi = require('joi');


const internals = {};


exports.register = function (server, options, next) {

    server.bind({ db: server.app.db });

    server.route({ method: 'POST', path: '/message', config: internals.post });

    setImmediate(next);
};


exports.register.attributes = {
    name: 'messaging'
};


exports.requiredTables = function() {
    return ['messages'];
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
