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
          src: "robots.txt",
          dest: "dist/robots.txt"
        },
        {
          src: "favicon.ico",
          dest: "dist/favicon.ico"
        }
      ]
    }
  });
};