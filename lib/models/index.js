module.exports = function (connection) {
    return {
        Auth: require('./auth')(connection),
        Courseware: require('./courseware')(connection),
        Social: require('./social')(connection)
    };
};
