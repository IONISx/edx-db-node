module.exports = function (connection) {
    return {
        User: require('./user')(connection)
    };
};
