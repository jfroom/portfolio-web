/*!
 * falsey <https://github.com/jonschlinkert/falsey>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var typeOf = require('kind-of');

module.exports = function falsey(val, keywords) {
  if (!val) return true;

  if (Array.isArray(val) || typeOf(val) === 'arguments') {
    return !val.length;
  }

  if (typeOf(val) === 'object') {
    return !Object.keys(val).length;
  }

  var arr = !keywords
    ? ['none', 'nil', 'nope', 'no', 'nada', '0', 'false']
    : arrayify(keywords);

  return arr.indexOf(val) !== -1;
};

function arrayify(val) {
  return Array.isArray(val) ? val : [val];
}
