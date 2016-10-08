'use strict';

const debug = require('debug')('ionisx:edxdb:courseware:student-module');

// ## //

class StudentModule {
    constructor(db) {
        this.db = db;
    }

    reset(options) {
        options = options || {};

        if (!options.course && !options.module && !options.user) {
            throw new Error('Search is too broad')
        }

        const query = {
            attributes: [
                'id'
            ],
            where: {},
            include: []
        };

        if (options.course) {
            query.where.course_id = options.course;
        }

        if (options.module) {
            query.where.module_id = {
                $like: `%${options.module}`
            };
        }

        if (options.user) {
            const userQuery = {
                model: this.db.models.Auth.User,
                attributes: [],
                where: {}
            };

            if (options.user.username) {
                userQuery.where.username = options.user.username;
            }

            if (options.user.id) {
                userQuery.where.id = options.user.id;
            }

            if (options.user.externalId) {
                userQuery.include = [{
                    model: this.db.models.Social.Auth,
                    attributes: [],
                    where: {
                        uid: options.user.externalId
                    }
                }];
            }

            query.include.push(userQuery);
        }

        const result = {
            studentModule: 0,
            studentModuleHistory: 0
        };

        return this.db.connection.transaction(transaction => {
            return this.db.models.Courseware.StudentModule
                .findAll(query)
                .then(rows => {
                    const ids = rows.map(row => row.get('id'));

                    if (!ids.length) {
                        debug('nothing was found, nor destroyed');

                        return;
                    }

                    return this.db.models.Courseware.StudentModuleHistory
                        .destroy({
                            where: {
                                student_module_id: {
                                    $in: ids
                                }
                            }
                        }, {
                            transaction: transaction
                        })
                        .then(deleted => {
                            result.studentModuleHistory = deleted;

                            debug(`history rows destroyed: ${deleted}`);

                            return this.db.models.Courseware.StudentModule.destroy({
                                where: {
                                    id: {
                                        $in: ids
                                    }
                                }
                            }, {
                                transaction: transaction
                            });
                        })
                        .then(deleted => {
                            result.studentModule = deleted;

                            debug(`rows destroyed: ${deleted}`);
                        });
                })
                .thenReturn(result);
        });
    }
};

// ## //

module.exports = db => new StudentModule(db);
