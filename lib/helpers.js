'use strict';

const fs = require('fs');
const path = require('path');
const semver = require('semver');
const sri = require('sri-toolbox');
const yaml = require('js-yaml');

const CONFIG_DIR_PATH = path.resolve(__dirname, '../config/');

function sriDigest(file, fromString) {
    file = fromString ? file : fs.readFileSync(file);
    return sri.generate({ algorithms: ['sha384'] }, file);
}

function selectedTheme(config, selected) {
    const themes = config.bootswatch4.themes;

    if (typeof selected === 'undefined' || selected >= themes.length) {
        return config.theme;
    }

    return parseInt(selected, 10) === 0 || parseInt(selected, 10) ?
        parseInt(selected, 10) :
        config.theme;
}

function getTheme(config, selected) {
    const themes = config.bootswatch4.themes;

    selected = selectedTheme(config, selected);

    return {
        uri: config.bootswatch4.bootstrap
                .replace('SWATCH_VERSION', config.bootswatch4.version)
                .replace('SWATCH_NAME', themes[selected].name),
        sri: themes[selected].sri
    };
}

function loadConfig(file) {
    return yaml.safeLoad(fs.readFileSync(path.join(CONFIG_DIR_PATH, file)), 'utf8');
}

function getConfig() {
    return require('../config'); // eslint-disable-line global-require
}

function getConfigPath(file) {
    return path.join(CONFIG_DIR_PATH, file);
}

function generateDataJson() {
    const config = getConfig();
    const data = {
        timestamp: new Date().toISOString(),
        bootstrap: {},
        fontawesome: {}
    };

    config.bootstrap.forEach((bootstrap) => {
        const bootstrapVersion = bootstrap.version;

        if (semver.satisfies(semver.coerce(bootstrapVersion), '<4')) {
            data.bootstrap[bootstrapVersion] = {
                css: bootstrap.stylesheet,
                js: bootstrap.javascript
            };
        }
    });

    config.fontawesome.forEach((fontawesome) => {
        data.fontawesome[fontawesome.version] = fontawesome.stylesheet;
    });

    return data;
}

module.exports = {
    getConfig,
    getConfigPath,
    generateDataJson,
    loadConfig,
    theme: {
        selected: selectedTheme,
        fetch: getTheme
    },
    sri: {
        digest: sriDigest
    }
};

// vim: ft=javascript sw=4 sts=4 et:
