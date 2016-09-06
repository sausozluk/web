module.exports = function () {
  this.loadTasks("build/tasks");

  this.registerTask("default", [
    "clean",
    "jshint",
    "processhtml",
    "copy",
    "requirejs",
    "styles",
    "cssmin",
    "connect",
    "watch"
  ]);
};