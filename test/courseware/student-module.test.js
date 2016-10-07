/* eslint-env mocha */
/* global expect */

const db = require('../..');

// ## //

describe('courseware.student-module', function () {
    before(function (done) {
        this.db = new db.EdxDatabase();
        this.db.connect('sqlite://test.sqlite');

        this.db.connection
            .sync({
                force: true
            })
            .then(() => {
                return this.db.models.Auth.User.create({
                    username: 'student-module-1',
                    first_name: 'Student',
                    last_name: 'Module',
                    email: 'student@module.com',
                    password: 'xxx',
                    is_staff: false,
                    is_active: true,
                    is_superuser: false,
                    last_login: 0,
                    date_joined: 0
                })
            })
            .then(user => {
                this.user = user;

                return this.db.models.Social.Auth.create({
                    user_id: user.get('id'),
                    provider: 'ionisx',
                    uid: 'ionisx-id-1',
                    extra_data: 'foo'
                });
            })
            .then(() => done(), done);
    });

    after(function (done) {
        this.db.connection.drop().then(() => done(), done);
    });

    describe('methods', function () {
        describe('reset', function () {
            it('should expose a reset method', function () {
                expect(this.db.Courseware.StudentModule.reset).to.be.a('function');
            });

            it('should throw if no filter is passed', function () {
                expect(this.db.Courseware.StudentModule.reset).to.throw('Search is too broad');
            });

            it('should remove the student module for user student-module-1', function (done) {
                this.db.models.Courseware.StudentModule
                    .create({
                        module_type: 'foo',
                        module_id: 'bar',
                        student_id: this.user.get('id'),
                        created: 0,
                        modified: 0,
                        done: 'ok',
                        course_id: 'the/course/id'
                    })
                    .then(() => this.db.Courseware.StudentModule.reset({
                        user: {
                            username: 'student-module-1'
                        }
                    }))
                    .then(res => {
                        expect(res.studentModule).to.equal(1);
                        expect(res.studentModuleHistory).to.equal(0);
                    })
                    .then(() => done(), done);
            });

            it('should remove any student module for user id 1', function (done) {
                this.db.models.Courseware.StudentModule
                    .create({
                        module_type: 'foo',
                        module_id: 'bar',
                        student_id: this.user.get('id'),
                        created: 0,
                        modified: 0,
                        done: 'ok',
                        course_id: 'the/course/id'
                    })
                    .then(() => this.db.Courseware.StudentModule.reset({
                        user: {
                            id: 1
                        }
                    }))
                    .then(res => {
                        expect(res.studentModule).to.equal(1);
                        expect(res.studentModuleHistory).to.equal(0);
                    })
                    .then(() => done(), done);
            });

            it('should remove any student module for user external id ionisx-id-1', function (done) {
                this.db.models.Courseware.StudentModule
                    .create({
                        module_type: 'foo',
                        module_id: 'bar',
                        student_id: this.user.get('id'),
                        created: 0,
                        modified: 0,
                        done: 'ok',
                        course_id: 'the/course/id'
                    })
                    .then(() => this.db.Courseware.StudentModule.reset({
                        user: {
                            externalId: 'ionisx-id-1'
                        }
                    }))
                    .then(res => {
                        expect(res.studentModule).to.equal(1);
                        expect(res.studentModuleHistory).to.equal(0);
                    })
                    .then(() => done(), done);
            });

            it('should remove any student module for module bar', function (done) {
                this.db.models.Courseware.StudentModule
                    .create({
                        module_type: 'foo',
                        module_id: 'bar',
                        student_id: this.user.get('id'),
                        created: 0,
                        modified: 0,
                        done: 'ok',
                        course_id: 'the/course/id'
                    })
                    .then(() => this.db.Courseware.StudentModule.reset({
                        module: 'bar'
                    }))
                    .then(res => {
                        expect(res.studentModule).to.equal(1);
                        expect(res.studentModuleHistory).to.equal(0);
                    })
                    .then(() => done(), done);
            });

            it('should remove any student module for course the/course/id', function (done) {
                this.db.models.Courseware.StudentModule
                    .create({
                        module_type: 'foo',
                        module_id: 'bar',
                        student_id: this.user.get('id'),
                        created: 0,
                        modified: 0,
                        done: 'ok',
                        course_id: 'the/course/id'
                    })
                    .then(() => this.db.Courseware.StudentModule.reset({
                        course: 'the/course/id'
                    }))
                    .then(res => {
                        expect(res.studentModule).to.equal(1);
                        expect(res.studentModuleHistory).to.equal(0);
                    })
                    .then(() => done(), done);
            });

            it('should not remove any student module if nothing matches', function (done) {
                this.db.models.Courseware.StudentModule
                    .create({
                        module_type: 'foo',
                        module_id: 'bar',
                        student_id: this.user.get('id'),
                        created: 0,
                        modified: 0,
                        done: 'ok',
                        course_id: 'the/course/id'
                    })
                    .then(() => this.db.Courseware.StudentModule.reset({
                        user: {
                            id: 3
                        }
                    }))
                    .then(res => {
                        expect(res.studentModule).to.equal(0);
                        expect(res.studentModuleHistory).to.equal(0);
                    })
                    .then(() => done(), done);
            });
        });
    });
});
