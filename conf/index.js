'use strict';

const Hoek = require('hoek');

const Default = require('./default');
const Env = require('./env');

exports = module.exports = Hoek.applyToDefaults(Default, Env);