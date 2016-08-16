'use strict';

var path = require('path');

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('extend-shallow', 'extend');
require('matched', 'glob');
require('is-valid-glob');
require('resolve-dir');
require('relative');
require = fn;


utils.resolve = function(cwd) {
  return path.resolve(utils.resolveDir(cwd));
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
