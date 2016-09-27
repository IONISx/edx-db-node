'use strict';

const Sequelize      = require('sequelize');

const registerModels = require('./models')

// ## //

class EdxDatabase {
    constructor(options) {
        this.connection = null;
        this.options = options;
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
            })
    }
};

// ## //

module.exports = new EdxDatabase();
