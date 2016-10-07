/* eslint-env mocha */
/* global expect */

const db = require('../..');

// ## //

describe('courseware.student-module', function () {
    before(function () {
        this.db = new db.EdxDatabase();
        this.db.connect('sqlite://test/databases/courseware.student-module');
    });

    describe('methods', function () {
        describe('reset', function () {
            it('should expose a reset method', function () {
                expect(this.db.Courseware.StudentModule.reset).to.be.a('function');
            });
        });
    });
});
