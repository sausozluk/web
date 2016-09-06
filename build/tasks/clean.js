module.exports = function () {
  this.loadNpmTasks("grunt-contrib-clean");
  return this.config("clean", ["dist/"]);
};