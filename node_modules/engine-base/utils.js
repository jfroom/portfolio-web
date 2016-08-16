'use strict';

/**
 * Module dependencies.
 */

var lazy = module.exports = require('lazy-cache')(require);

/**
 * Lazily required module dependencies
 */

lazy('object.omit', 'omit');
lazy('object.pick', 'pick');
lazy('mixin-deep', 'merge');
lazy('engine-utils', 'utils');
lazy('delimiter-regex', 'delims');
lazy('engine', 'Engine');
