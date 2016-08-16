'use strict';

var getOwner = require('./helpers/owner');
var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  schema.checked = schema.checked || {};
  if (schema.checked[key]) {
    return val;
  }

  if (schema.options.repository) {
    val = schema.options.repository;
  }

  if (utils.isObject(val) && val.url) {
    val = val.url;
  }

  if (!utils.isString(val) && config.homepage) {
    val = config.homepage;
  }

  var opts = utils.merge({}, schema.options, config);
  var owner = opts.owner || getOwner(val, key, config, schema);

  if (opts.name && owner) {
    val = owner + '/' + opts.name;
  }

  if (utils.isString(val)) {
    schema.checked[key] = true;
    return utils.repo.repository(val);
  }

  // if not returned already, val is invalid
  delete config[key];
  return;
};
