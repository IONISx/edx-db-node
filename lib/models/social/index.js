module.exports = function (connection) {
    return {
        Auth: require('./auth')(connection)
    };
};
