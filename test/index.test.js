/* eslint-env mocha */
/* global expect */

const db = require('..');

// ## //

describe('index', function () {
    describe('defaults', function () {
        it('should not be connected by default', function () {
            expect(db.connection).to.be.null;
        });

        it('should not have any model configured by default', function () {
            expect(db.models).to.be.null;
        });
    });

    describe('connect', function () {
        it('should expose a connect method', function () {
            expect(db.connect).to.be.a('function');
        });

        it('should fail if no connection string is specified', function () {
            expect(db.connect).to.throw('Parameter \'url\' must be a string, not undefined');
        });

        it('should fail if the connection string is invalid', function () {
            const connect = () => db.connect('bar');

            expect(connect).to.throw('Cannot read property \'replace\' of null');
        });

        it('should not fail if the connection string is valid', function () {
            db.connect('sqlite://test/databases/index.db');

            expect(db.connection).to.be.ok;
        });
    });

    describe('models', function () {
        it('should register models', function () {
            expect(db.models).to.be.ok;
            expect(db.models.Auth).to.be.ok;
            expect(db.models.Courseware).to.be.ok;
            expect(db.models.Social).to.be.ok;
        });
    });

    describe('modules', function () {
        it('should expose modules', function () {
            expect(db.Courseware).to.be.ok;
        });
    });
});
