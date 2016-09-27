const sequelize = require('sequelize');

// ## //

module.exports = function (connection) {
    return connection.define('courseware_studentmodulehistory', {
        id: {
            type: sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        student_module_id: {
            type: sequelize.INTEGER(11),
            allowNull: false
        },

        version: {
            type: sequelize.STRING,
            allowNull: true
        },

        created: {
            type: sequelize.DATE,
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

        max_grade: {
            type: sequelize.DOUBLE,
            allowNull: true
        }
    }, {
        tableName: 'courseware_studentmodulehistory',
        timestamps: false
    });
}
