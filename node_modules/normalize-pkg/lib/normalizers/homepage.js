'use strict';

var getOwner = require('./helpers/owner');
var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (schema.options.homepage) {
    return schema.options.homepage;
  }

  schema.update('repository', config);
  if (utils.isString(config.repository)) {
    return utils.repo.homepage(config.repository);
  }

  if (utils.isString(val)) return val;

  var opts = utils.merge({}, schema.options, config);
  var owner = opts.owner || getOwner(val, key, config, schema);

  if (utils.isString(owner) && utils.isString(opts.name)) {
    return utils.repo.homepage(owner + '/' + opts.name);
  }
};
