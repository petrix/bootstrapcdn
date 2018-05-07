'use strict';

const helpers = require('../lib/helpers.js');
const csp = require('./helmet-csp.js');

module.exports.CSP = csp;

['_app.yml', '_extras.yml', '_files.yml'].forEach((config) => {
    module.exports = Object.assign(helpers.loadConfig(config), module.exports);
});

// vim: ft=javascript sw=4 sts=4 et:
