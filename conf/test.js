'use strict';

const Hoek = require('hoek');

const Default = require('./default');
const Env = require('./env');

const Test = Hoek.applyToDefaults(Default, {
    db: {
        test: true
    }
});

exports = module.exports = Hoek.applyToDefaults(Test, Env);
