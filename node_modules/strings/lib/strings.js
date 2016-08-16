/**
 * Strings <https://github.com/sellside/strings>
 *
 * Copyright (c) 2014 Sellside, Jon Schlinkert and Brian Woodward
 * Licensed under the MIT License (MIT).
 */

'use strict';

var _ = require('lodash');
var frep = require('frep');

var Pattern = require('./pattern');

var Strings = module.exports = function (config) {
  this.config = config || {};
  this.options = config.options || {};
  this.structure = config.structure || '';
  this.middleware = config.middleware || [];
};

var wrap = function (ctx) {
  return function () {
    return ctx;
  };
};

var ensureMiddleware = function (middleware) {
  if (_.isFunction(middleware) === false) {
    return wrap(middleware);
  }
  return middleware;
};

var extend = function (middleware) {
  return function (context) {
    return _.extend(context, ensureMiddleware(middleware)());
  };
};

var remove = function (middleware) {
  return function (context) {
    return _.omit(context, ensureMiddleware(middleware)());
  };
};

Strings.prototype.use = function (middleware) {
  this.middleware.push(extend(middleware));
  return this;
};

Strings.prototype.exclude = function (middleware) {
  this.middleware.push(remove(middleware));
  return this;
};

Strings.prototype.context = function () {
  return _.reduce(this.middleware, function (ctx, middleware) {
    return middleware(ctx);
  }, {});
};

Strings.prototype.patterns = function () {
  var context = this.context();

  /**
   * @param { RegExp,String }    key     String or RegExp pattern to find strings to replace
   * @param { String|Function }  value   Replacement string or function
   * @example `new RegExp(  pattern  ), replacement )`
   *
   * @return {String} Returns the transformed string.
   * @api Public
   */
  var patterns = _.map(context, function (value, key) {

    // if the value is a Pattern
    // it's already in the correct format
    if (value instanceof Pattern) {

      // if replacement is a function, make sure it runs
      // with the correct context
      if (_.isFunction(value.replacement)) {
        var fn = value.replacement;
        value.replacement = function () {
          return fn.apply(context, [].slice.call(arguments));
        };
      }
      return value;
    }

    // if value is a function, make sure it runs
    // with the correct context
    if (_.isFunction(value)) {
      var fn = value;
      value = function () {
        return fn.apply(context, [].slice.call(arguments));
      };
    }
    return new Pattern(new RegExp(':\\b' + key + '\\b'), value );
  });
  return patterns;
};

Strings.prototype.run = function (structure, options) {
  if (_.isPlainObject(structure)) {
    options = structure;
  } else {
    this.structure = structure || this.structure || '';
  }
  return frep.strWithArr(this.structure, this.patterns());
};