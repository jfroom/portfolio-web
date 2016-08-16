'use strict';

var utils = require('../utils');

/**
 * Stringify a person object, or array of person objects, such as
 * `maintainer`, `collaborator`, `contributor`, and `author`.
 *
 * @param {Object|Array|String} `val` If an object is passed, it will be converted to a string. If an array of objects is passed, it will be converted to an array of strings.
 * @return {String}
 * @api public
 */

module.exports = function person(val) {
  if (Array.isArray(val)) {
    return val.map(person);
  }
  if (utils.isObject(val)) {
    return utils.stringify(val);
  }
  return val;
};
