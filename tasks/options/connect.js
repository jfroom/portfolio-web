//require("grunt").log.writeln("connect.js process.env[LIVERELOAD_PORT;] " + process.env["LIVERELOAD_PORT"] + 'process.env["SERVER_HOSTNAME"]:' + process.env["SERVER_HOSTNAME"])
module.exports = {
  options: {
    port: process.env["SERVER_PORT"],
    hostname: process.env["SERVER_HOSTNAME"] // change this to '0.0.0.0' to access the server from outside
    ,livereload: process.env["LIVERELOAD_PORT"]
  },

  livereload: {
      options: {
          open: false,
          base: [
              '.tmp',
              '.tmp-spritesheet',
              'app'
          ]
      }
  },
  test: {
      options: {
          base: [
              '.tmp',
              '.tmp-spritesheet',
              'test',
              'app'
          ]
      }
  },
  dist: {
      options: {
          open: false,
          base: 'dist',
          livereload: false
      }
  }


};
