module.exports = function () {
  this.loadNpmTasks("grunt-contrib-requirejs");
  return this.config("requirejs", {
    release: {
      options: {
        mainConfigFile: "app/config.js",
        generateSourceMaps: false,
        include: ["config", "main"],
        out: "dist/source.min.js",
        optimize: "uglify2",
        baseUrl: "app",
        paths: {
          "almond": "../deps/almond/almond"
        },
        name: "almond",
        wrap: true,
        preserveLicenseComments: false
      }
    }
  });
};