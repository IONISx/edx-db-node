const sequelize = require('sequelize');

// ## //

module.exports = function (connection) {
    return connection.define('social_auth_usersocialauth', {
        id: {
            type: sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: sequelize.INTEGER(11),
            allowNull: false
        },

        provider: {
            type: sequelize.STRING,
            allowNull: false
        },

        uid: {
            type: sequelize.STRING,
            allowNull: false
        },

        extra_data: {
            type: sequelize.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'social_auth_usersocialauth',
        timestamps: false
    });
}
