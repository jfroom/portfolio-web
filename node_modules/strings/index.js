/**
 * Strings <https://github.com/sellside/strings>
 *
 * Copyright (c) 2014 Sellside, Jon Schlinkert and Brian Woodward
 * Licensed under the MIT License (MIT).
 */

'use strict';

var _ = require('lodash');

var Strings = require('./lib/strings');

var _instance = null;

var strings = module.exports = function(structure, data) {
  _instance = null;
  strings.instance();

  if (data) {
    _instance.use(data);
  }
  return _instance.run(structure);
};

strings.instance = function (structure) {
  if (_instance === null ) {
    return _instance = new Strings({
      structure: structure
    });
  }
  return _instance;
};

strings.use = function (middleware) {
  return strings.instance().use(middleware);
};

strings.exclude = function (middleware) {
  return strings.instance().exclude(middleware);
};

strings.context = function () {
  return strings.instance().context();
};

strings.patterns = function () {
  return strings.instance().patterns();
};

strings.run = function (structure, options) {
  return strings.instance().run(structure, options);
};

strings.Pattern = require('./lib/pattern');

// middleware
var middleware = require('./lib/middleware');
_.map(middleware, function(value, key) {
  strings[key] = value;
});