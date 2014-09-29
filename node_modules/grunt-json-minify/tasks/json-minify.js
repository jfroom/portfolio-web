/*
 * grunt-json-minify
 * https://github.com/mlegenhausen/grunt-json-minify
 *
 * Copyright (c) 2013 Malte Legenhausen
 * Licensed under the MIT license.
 */
var JSON5 = require('json5');

module.exports = function(grunt) {
  grunt.registerMultiTask('json-minify', 'JSON minification task', function() {
    var totalInBytes = 0;
    var totalOutBytes = 0;
    var totalProfitPercents = 0;
    var files = grunt.file.expand(this.data.files);

    function calcCompression(inBytes, outBytes) {
      var profitPercents = 100 - outBytes * 100 / inBytes;
      return (Math.round((inBytes / 1024) * 1000) / 1000) + ' KiB - ' +
        ((Math.round(profitPercents * 10) / 10) + '%').green + ' = ' +
        (Math.round((outBytes / 1024) * 1000) / 1000) + ' KiB';
    }

    files.forEach(function(filepath) {
      var data = grunt.file.read(filepath);
      var compressed;

      try {
        compressed = JSON5.stringify(JSON5.parse(data));
      } catch (err) {
        grunt.fail.warn(err);
      }

      grunt.file.write(filepath, compressed);

      // and print profit info
      grunt.log.writeln('File "' + filepath + '":');
      grunt.log.ok(calcCompression(data.length, compressed.length));

      totalInBytes += data.length;
      totalOutBytes += compressed.length;
    });

    grunt.log.writeln('\nTotal compressed: ' + files.length + ' files');
    grunt.log.ok(calcCompression(totalInBytes, totalOutBytes));
  });
};
