'use strict';

const assert = require('assert').strict;
const helpers = require('./test_helpers.js');

describe('fontawesome', () => {
    const config = helpers.getConfig();
    const uri = helpers.runApp('fontawesome');
    const current = config.fontawesome[0];
    let response = {};

    before((done) => {
        helpers.prefetch(uri, (res) => {
            response = res;
            done();
        });
    });

    it('works', (done) => {
        helpers.assert.itWorks(response.statusCode, done);
    });

    it('is current', (done) => {
        assert.ok(current.current);
        done();
    });

    it('valid html', (done) => {
        helpers.assert.validHTML(response, done);
    });

    it('contains authors', (done) => {
        helpers.assert.authors(response, done);
    });

    it('has page header', (done) => {
        helpers.assert.pageHeader('Font Awesome', response, done);
    });

    current.assets.forEach((type) => {
        it('has stylesheet', (done) => {
            assert.ok(response.body.includes(type.url),
                `Expects response body to include "${type.url}"`);
            done();
        });

        ['html', 'pug', 'haml'].forEach((fmt) => {
            it(`has ${fmt}`, (done) => {
                const str = helpers.css[fmt](type.url, type.sri);

                assert.ok(response.body.includes(str), `Expects response body to include "${str}"`);
                done();
            });
        });
    });
});
