'use strict';

// load enviornment vars and store nconf into env
var grunt = require('grunt');
var settingsPath = "settings.json"
var nconf = require('nconf').argv().env();
var nconfKeys = nconf.get();
if (nconfKeys.PATH_PORTFOLIO_SETTINGS) { // can set your own enviorment variable to override local settings
  settingsPath = nconfKeys.PATH_PORTFOLIO_SETTINGS;
}
nconf = nconf.file(settingsPath);
process.env.SETTINGS_PATH = settingsPath;

var helpers = require("handlebars-helpers");
//nconf.defaults({});
global.nconf = nconf;

// set up some global vars
process.env.useSauceLabs = 'false';
process.env.isTravisBuild = 'false';
require('time-grunt')(grunt);

function transferNconfToEnv() {
  var nconfKeys = nconf.get();
  for (var key in nconfKeys) {
    process.env[key] = nconfKeys[key];
  }
}
transferNconfToEnv();

function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;
  glob.sync('*', {
    cwd: path
  }).forEach(function (option) {
    key = option.replace(/\.js$/, '');
    object[key] = require(path + option);
  });

  return object;
}

module.exports = function (grunt) {

  // Load all grunt tasks
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '@*/grunt-*', '!grunt-assemble-*']});
  grunt.loadNpmTasks('node-spritesheet');

  require('handlebars-helpers');

  // configurable paths
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/'));
  grunt.config.init(config);
  grunt.loadTasks('tasks');
};
