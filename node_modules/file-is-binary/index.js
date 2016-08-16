'use strict';

var stat = require('file-stat');
var isObject = require('isobject');
var isBinary = require('isbinaryfile');

module.exports = function(file) {
  if (!isObject(file)) {
    throw new Error('expected file to be an object');
  }

  if (file.hasOwnProperty('_isBinary')) {
    return file._isBinary;
  }

  if (isNull(file) || isDirectory(file)) {
    file._isBinary = false;
    return false;
  }

  var len = file.stat ? file.stat.size : file.contents.length;
  file._isBinary = isBinary.sync(file.contents, len);
  return file._isBinary;
};

function isNull(file) {
  if (typeof file.isNull !== 'function') {
    file.isNull = function() {
      return file.contents === null;
    };
  }
  return file.isNull();
}

function isDirectory(file) {
  if (typeof file.stat === 'undefined') {
    stat.statSync(file);
    file.isDirectory = function() {
      return file.stat && file.stat.isDirectory();
    }
  }
  return file.isDirectory();
}
