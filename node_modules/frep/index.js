/**!
 * frep <http://github.com/jonsclhinkert/frep>
 * Copyright (c) 2014, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

const utils = require('./lib/utils');


var patternArray = function(str, patterns) {
  return patterns.reduce(function(content, pairings) {
    return content.replace(pairings[0], pairings[1]);
  }, str);
};



/**
 * Transform a string with an array of RegExp or
 * string replacement patterns
 * @param  {String} str          The string to modify.
 * @param  {Array}  replacements Array of replacement patterns.
 * @return {String}              The new string.
 */
function strWithArr(str, replacements) {
  return patternArray(str, replacements.map(function(match) {
    var flags = replacements.flags? replacements.flags : 'g';
    match.pattern = utils.buildRegexGroup(match.pattern, flags);
    return [match.pattern, match.replacement];
  }));
};


/**
 * Transform an array of strings with an array of
 * RegExp or string replacement patterns
 * @param  {Array}  arr          The array of strings to modify.
 * @param  {Array}  replacements Array of replacement patterns.
 * @return {String}              The new string.
 */
function arrWithArr(arr, replacements) {
  return arr.map(function(match) {
    return strWithArr(match, replacements);
  })
};


/**
 * Transform a string with an object of RegExp or
 * string replacement patterns
 * @param  {String} str       The string to modify.
 * @param  {Object} patterns  Array of replacement patterns.
 * @return {String}           The new string.
 */
function strWithObj(str, replacements) {
  var re = new RegExp(Object.keys(replacements).join('|'), 'gi');
  return str.replace(re, function(match) {
    return replacements[match];
  });
};


/**
 * Transform an array of strings with an array of
 * objects of RegExp or string replacement patterns
 * @param  {Array}  arr          The array of strings to modify.
 * @param  {Array}  replacements Array of replacement patterns.
 * @return {String}              The new string.
 */
function arrWithObj(arr, replacements) {
  return arr.map(function(match) {
    return strWithObj(match, replacements);
  })
};


module.exports = {
  strWithArr: strWithArr,
  arrWithArr: arrWithArr,
  strWithObj: strWithObj,
  arrWithObj: arrWithObj,

  // Aliases
  replaceStr: strWithArr,
  replaceArr: arrWithArr,
  replaceObj: strWithObj,
  replaceObjArr: arrWithObj
};