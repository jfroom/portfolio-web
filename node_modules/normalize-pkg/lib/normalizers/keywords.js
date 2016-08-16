'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  val = utils.arrayify(val);
  if (val.length === 0) {
    schema.update('name', config);
    val = config[key] = config.name.split(/\W+/).filter(Boolean);
  }
  return utils.unique(val).sort();
};

