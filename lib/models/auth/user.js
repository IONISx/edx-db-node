const sequelize = require('sequelize');

// ## //

module.exports = function (connection) {
    return connection.define('auth_user', {
        id: {
            type: sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: sequelize.STRING,
            allowNull: false
        },

        first_name: {
            type: sequelize.STRING,
            allowNull: false
        },

        last_name: {
            type: sequelize.STRING,
            allowNull: false
        },

        email: {
            type: sequelize.STRING,
            allowNull: false
        },

        password: {
            type: sequelize.STRING,
            allowNull: false
        },

        is_staff: {
            type: sequelize.BOOLEAN,
            allowNull: false
        },

        is_active: {
            type: sequelize.BOOLEAN,
            allowNull: false
        },

        is_superuser: {
            type: sequelize.BOOLEAN,
            allowNull: false
        },

        last_login: {
            type: sequelize.DATE,
            allowNull: false
        },

        date_joined: {
            type: sequelize.DATE,
            allowNull: false
        }
    }, {
        tableName: 'auth_user',
        timestamps: false,
        classMethods: {
            associate: function (models) {
                this.hasOne(models.Social.Auth, {
                    foreignKey: 'user_id'
                });
            }
        }
    });
}
