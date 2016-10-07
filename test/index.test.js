/* eslint-env mocha */
/* global expect */

const db = require('..');

// ## //

describe('index', function () {
    it('should expose an instance of EdxDatabase', function () {
        expect(db).to.be.an.instanceof(db.EdxDatabase);
    });

    describe('defaults', function () {
        it('should not be connected by default', function () {
            expect(db.connection).to.be.null;
        });

        it('should not have any model configured by default', function () {
            expect(db.models).to.be.null;
        });
    });

    describe('connect', function () {
        beforeEach(function () {
            this.db = new db.EdxDatabase();
        });

        it('should expose a connect method', function () {
            expect(this.db.connect).to.be.a('function');
        });

        it('should fail if no connection string is specified', function () {
            expect(this.db.connect).to.throw('Parameter \'url\' must be a string, not undefined');
        });

        it('should fail if the connection string is invalid', function () {
            const connect = () => this.db.connect('bar');

            expect(connect).to.throw('Cannot read property \'replace\' of null');
        });

        it('should not fail if the connection string is valid', function () {
            this.db.connect('sqlite://test.sqlite');

            expect(this.db.connection).to.be.ok;
        });

        it('should pass options to the underlying connection', function () {
            this.db.connect('sqlite://test.sqlite', {
                logging: false
            });

            expect(this.db.connection.options.logging).to.be.false;
        });
    });

    describe('models', function () {
        before(function () {
            this.db = new db.EdxDatabase();
            this.db.connect('sqlite://test.sqlite');
        });

        it('should register models', function () {
            expect(this.db.models).to.be.ok;
            expect(this.db.models.Auth).to.be.ok;
            expect(this.db.models.Courseware).to.be.ok;
            expect(this.db.models.Social).to.be.ok;
        });
    });

    describe('modules', function () {
        before(function () {
            this.db = new db.EdxDatabase();
            this.db.connect('sqlite://test.sqlite');
        });

        it('should expose modules', function () {
            expect(this.db.Courseware).to.be.ok;
        });
    });
});
