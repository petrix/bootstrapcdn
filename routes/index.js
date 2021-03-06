'use strict';

// This file just holds all route requires
const notFoundRoute = require('./404.js');
const aboutRoute = require('./about.js');
const bootlintRoute = require('./bootlint.js');
const bootswatch4Route = require('./bootswatch4.js');
const bootswatchRoute = require('./bootswatch.js');
const dataRoute = require('./data.js');
const fontawesomeRoute = require('./fontawesome.js');
const indexRoute = require('./home.js');
const integrationsRoute = require('./integrations.js');
const legacyRoutes = require('./legacy.js');
const privacyPolicyRoute = require('./privacyPolicy.js');
const redirectToRoot = require('./redirectToRoot.js');
const showcaseRoute = require('./showcase.js');

const routes = {
    notFoundRoute,
    aboutRoute,
    bootlintRoute,
    bootswatch4Route,
    bootswatchRoute,
    dataRoute,
    fontawesomeRoute,
    indexRoute,
    integrationsRoute,
    legacyRoutes,
    privacyPolicyRoute,
    redirectToRoot,
    showcaseRoute
};

module.exports = routes;

// vim: ft=javascript sw=4 sts=4 et:
