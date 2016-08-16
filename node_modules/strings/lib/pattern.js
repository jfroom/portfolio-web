/**
 * Strings <https://github.com/sellside/strings>
 *
 * Copyright (c) 2014 Sellside, Jon Schlinkert and Brian Woodward
 * Licensed under the MIT License (MIT).
 */

'use strict';

var Pattern = module.exports = function(pattern, replacement) {
  this.pattern = pattern;
  this.replacement = replacement;
};