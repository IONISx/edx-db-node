module.exports = db => ({
    StudentModule: require('./student-module')(db)
});
