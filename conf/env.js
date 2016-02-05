'use strict';

exports = module.exports = {

    http: {
        host: process.env.HTTP_HOST,
        port: process.env.HTTP_PORT
    },

    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
};