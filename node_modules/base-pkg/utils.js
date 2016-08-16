'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('cache-base', 'Cache');
require('define-property', 'define');
require('expand-pkg', 'Pkg');
require('extend-shallow', 'extend');
require('is-valid-app', 'isValid');
require('log-utils', 'log');
require('pkg-store');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
