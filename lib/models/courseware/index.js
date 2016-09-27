module.exports = function (connection) {
    return {
        StudentModule: require('./student-module')(connection),
        StudentModuleHistory: require('./student-module-history')(connection)
    };
};
