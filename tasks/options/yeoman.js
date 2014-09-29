var nconf = require("nconf");
module.exports = {
  app: "app",
  dist: "dist",
  tmp: ".tmp",
  hostname: nconf.get("SERVER_HOSTNAME") // 'localhost'
};