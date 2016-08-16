const _ = require('lodash');

/**
 * Export utils
 */

var utils = module.exports = {};

utils.arrayify = function(arr) {
  return !Array.isArray(arr) ? [arr] : _.compact(arr);
};

// Build RegExp patterns for delimiters
utils.buildRegexGroup = function (re, flags) {
  // If it's already regex, return.
  if(_.isRegExp(re)) {
    return re;
  }
  // If it's a string or array, continue
  re = utils.arrayify(re);
  var len = re.length;
  re = (len > 0) ? re.join('|') : re;

  if(len > 1) {
    re = '(' + re + ')';
  }
  return new RegExp(re, flags);
};
