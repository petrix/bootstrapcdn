#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

let version = process.argv[2];

if (!version) {
    console.log('Please pass the Bootswatch version as an argument.');
    process.exit(1);
}

// strip leading 'v' if present
version = version.replace(/^v/, '');

const basedir = path.join(__dirname, '..');
const bootswatchSrcDir = path.join(basedir, 'node_modules/bootswatch/dist');
const bootswatchDistDir = path.join(basedir, 'public', 'bootswatch', version);

if (fs.existsSync(bootswatchDistDir)) {
    console.log('Bootswatch version already found.');
    process.exit(1);
}

fs.mkdirSync(bootswatchDistDir);

try {
    fse.copySync(`${bootswatchSrcDir}`, `${bootswatchDistDir}`, {
        overwrite: false,
        errorOnExist: true,
        preserveTimestamps: true
    });
    console.log(`Successfully copied "${bootswatchSrcDir}" to "${bootswatchDistDir}"`);
    console.log(`\nDo not forget to update "${path.normalize('config/_config.yml')}"!`);
} catch (err) {
    throw new Error(err);
}
