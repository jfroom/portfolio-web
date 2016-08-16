'use strict';

var utils = require('../utils');
var cache = {};
var parsed;

module.exports = function(val, key, config, schema) {
  if (utils.isString(config.repository)) {
    utils.merge(config, utils.repo.expandUrl(config.homepage, config));
  }

  if (!parsed && !utils.isObject(val)) {
    var git = utils.parseGitConfig.sync(val);
    var obj = utils.parseGitConfig.keys(git);
    git = utils.merge({}, git, obj);
    val = parsed = config[key] = git;
  }
  return parsed || val;
};
