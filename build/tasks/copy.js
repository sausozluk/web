module.exports = function () {
  this.loadNpmTasks("grunt-contrib-copy");
  return this.config("copy", {
    release: {
      files: [
        {
          src: "deps/**",
          dest: "dist/"
        },
        {
          expand: true,
          cwd: "app/assets/",
          src: "**",
          dest: "dist/assets/"
        },
        {
          src: "package.json",
          dest: "dist/package.json"
        }
      ]
    }
  });
};