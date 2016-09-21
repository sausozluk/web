module.exports = function () {
  this.loadNpmTasks("grunt-contrib-jshint");
  return this.config("jshint", {
    all: ["app/**/*.js"],
    options: {
      jshintrc: ".jshintrc",
      reporterOutput: "",
      ignores: "app/libraries/3th/**/*.js"
    }
  });
};
