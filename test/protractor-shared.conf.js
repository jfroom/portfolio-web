var grunt = require("grunt");
require('coffee-script');
var shared = function(config) {
  var conf = require("../node_modules/protractor/referenceConf");
  grunt.util._.extend(conf.config, {
    specs: [],
    onPrepare: './lib/protractor.onPrepare.coffee',
    debug:true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: "http://" + process.env["SERVER_HOSTNAME"] + ":" + process.env["SERVER_PORT"],
    chromeDriver: '../node_modules/chromedriver/bin/chromedriver',

  });
  return conf.config;
};

module.exports = shared;
