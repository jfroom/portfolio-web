var nconf = require("nconf");
module.exports = {
  server: {
    path: 'http://' + nconf.get("SERVER_HOSTNAME") + ':' + nconf.get("SERVER_PORT") +'/',
    app: 'Firefox' //'Google Chrome Canary'
  }
};
