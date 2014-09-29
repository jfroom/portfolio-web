var nconf = require('nconf').argv().env().file('settings.json');
global.sauceConnectLauncher = undefined;
global.sauceConnectProcess = undefined;
module.exports = function(grunt) {
  grunt.registerTask('sauce', function(target) {
    console.log('server target:' + target);

    switch (target){
      case 'enable':
        process.env.useSauceLabs = 'true';
        break;
      case 'connect':
        var done = this.async();
        console.log("Started Sauce Connect Start");
        global.sauceConnectLauncher = require('sauce-connect-launcher'),
          options = {
            username: nconf.get("SAUCE_USERNAME"),
            accessKey: nconf.get("SAUCE_ACCESS_KEY"),
            tunnelIdentifier: null // optionally identity the tunnel for concurrent tunnels
          };

        global.sauceConnectLauncher(options, function (err, _sauceConnectProcess) {
          global.sauceConnectProcess = _sauceConnectProcess;
          console.log("Started Sauce Connect Process");
          if (err) {
            grunt.log.error(err)
            return;
          }
          done();

        });
        break;
      case 'disconnect':
         if (global.sauceConnectLauncher !== undefined && global.sauceConnectProcess !== undefined){
           var done = this.async();
           console.log("Started Sauce Connect Disconnect Start");
           global.sauceConnectProcess.close(function () {
             console.log("Closed Sauce Connect process");
             done();
           });
         }
        break;
    }

  });
};