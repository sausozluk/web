module.exports = function () {
  this.loadNpmTasks("grunt-bbb-styles");
  return this.config("styles", {
    "dist/styles.css": {
      src: "app/styles/index.css",
      paths: ["app/styles"]
    }
  });
};