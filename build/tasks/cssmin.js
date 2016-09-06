module.exports = function () {
  this.loadNpmTasks("grunt-contrib-cssmin");
  return this.config("cssmin", {
    release: {
      files: {
        "dist/styles.min.css": ["dist/styles.css"]
      }
    }
  });
};