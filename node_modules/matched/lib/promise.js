'use strict';

var glob = require('./async');
var utils = require('./utils');

module.exports = function(patterns, options) {
  var Promise = utils.promise;

  return new Promise(function(resolve, reject) {
    glob(patterns, options, function(err, files) {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
};
