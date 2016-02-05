'use strict';

const Joi = require('joi');


const internals = {};


exports.register = function (server, options, callback) {

    const db = server.app.db;

    server.bind({ db: db });

    server.route({ method: 'POST', path: '/message', config: internals.post });

    server.ext('onPostStart', internals.onPostStart);

    return callback();
};


exports.register.attributes = {
    name: 'messaging'
};


exports.requiredTables = function () {

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

internals.onPostStart = function (server, next) {

    server.subscription('/messages');

    this.db.messages.changes('*', (err, change) => {

        if (err) {
            return server.log(['error'], err);
        }

        return server.publish('/messages', change.after);

    }, next);
};

