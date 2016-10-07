'use strict';

const Sequelize      = require('sequelize');

const registerModels = require('./models')

// ## //

class EdxDatabase {
    constructor() {
        this.connection = null;
        this.models = null;
    }

    connect(cstring, options) {
        this.connection = new Sequelize(cstring, options || {});

        this.models = registerModels(this.connection);

        Object
            .keys(this.models)
            .forEach(schemaName => {
                const schema = this.models[schemaName];

                Object
                    .keys(schema)
                    .forEach(modelName => {
                        const model = schema[modelName];

                        if ('associate' in model) {
                            model.associate(this.models);
                        }
                    });
            });

        this.Courseware = require('./courseware')(this);
    }
};

// ## //

module.exports = new EdxDatabase();
module.exports.EdxDatabase = EdxDatabase;
