module.exports = function () {
  this.loadNpmTasks("grunt-contrib-watch");
  return this.config("watch", {
    files: ["app/**/*"],
    tasks: [
      "clean",
      "jshint",
      "processhtml",
      "copy",
      "requirejs",
      "styles",
      "cssmin"
    ]
  });
};