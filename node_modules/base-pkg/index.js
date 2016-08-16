/*!
 * base-pkg <https://github.com/jonschlinkert/base-pkg>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var util = require('util');
var utils = require('./utils');

module.exports = function(config, fn) {
  if (typeof config === 'function') {
    fn = config;
    config = {};
  }

  return function plugin(app) {
    if (!utils.isValid(app, 'base-pkg')) return;

    var pkg;
    this.define('pkg', {
      configurable: true,
      enumerable: true,
      set: function(val) {
        pkg = val;
      },
      get: function() {
        if (pkg) {
          decorate(app, pkg);
          return pkg;
        }
        var cwd = app.cwd || process.cwd();
        var opts = utils.extend({cwd: cwd}, config, app.options);
        pkg = utils.pkgStore(opts);
        decorate(app, pkg);
        return pkg;
      }
    });

    return plugin;
  };
};

/**
 * Utils
 */

function decorate(app, pkg) {
  if (pkg.logValue) return;
  utils.define(pkg, 'expand', function() {
    var config = new utils.Pkg();
    var data = utils.extend({}, pkg.data);
    var expanded = config.expand(data);
    var cache = new utils.Cache(expanded);
    return cache;
  });
  utils.define(pkg, 'logValue', function(msg, val) {
    console.log(utils.log.timestamp, msg, util.inspect(val, null, 10));
  });
  utils.define(pkg, 'logInfo', function(msg, val) {
    val = utils.log.colors.cyan(util.inspect(val, null, 10));
    console.log(utils.log.timestamp, msg, val);
  });
  utils.define(pkg, 'logWarning', function(msg, val) {
    val = utils.log.colors.yellow(util.inspect(val, null, 10));
    console.log(utils.log.timestamp, msg, val);
  });
  utils.define(pkg, 'logError', function(msg, val) {
    val = utils.log.colors.red(util.inspect(val, null, 10));
    console.log(utils.log.timestamp, msg, val);
  });
  utils.define(pkg, 'logSuccess', function(msg, val) {
    val = utils.log.colors.green(util.inspect(val, null, 10));
    console.log(utils.log.timestamp, msg, val);
  });
}
