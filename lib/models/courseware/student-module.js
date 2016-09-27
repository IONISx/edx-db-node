const sequelize = require('sequelize');

// ## //

module.exports = function (connection) {
    return connection.define('courseware_studentmodule', {
        id: {
            type: sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        module_type: {
            type: sequelize.STRING,
            allowNull: false
        },

        module_id: {
            type: sequelize.STRING,
            allowNull: false
        },

        student_id: {
            type: sequelize.INTEGER(11),
            allowNull: false
        },

        state: {
            type: sequelize.TEXT,
            allowNull: true
        },

        grade: {
            type: sequelize.DOUBLE,
            allowNull: true
        },

        created: {
            type: sequelize.DATE,
            allowNull: false
        },

        modified: {
            type: sequelize.DATE,
            allowNull: false
        },

        max_grade: {
            type: sequelize.DOUBLE,
            allowNull: true
        },

        done: {
            type: sequelize.STRING,
            allowNull: false
        },

        course_id: {
            type: sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'courseware_studentmodule',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.Auth.User, {
                    foreignKey: 'student_id'
                });

                this.hasMany(models.Courseware.StudentModuleHistory, {
                    foreignKey: 'student_module_id'
                });
            }
        }
    });
}
