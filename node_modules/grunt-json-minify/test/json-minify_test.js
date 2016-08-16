'use strict';

const grunt = require('grunt');

exports['json-minify'] = {
  default_options: function (test) {
    test.expect(1);

    const actual = grunt.file.read('.tmp/default_options.json');
    const expected = grunt.file.read('test/expected/default_options.json');
    test.equal(actual, expected, 'should create a minified json file');

    test.done();
  },

  duplicate_keys: function (test) {
    test.expect(1);

    const actual = grunt.file.read('.tmp/duplicate_keys.json');
    const expected = grunt.file.read('test/expected/duplicate_keys.json');
    test.equal(actual, expected, 'should remove duplicate keys');

    test.done();
  },

  custom_transform: function (test) {
    test.expect(1);

    const actual = grunt.file.read('.tmp/custom_transform.json');
    const expected = grunt.file.read('test/expected/custom_transform.json');
    test.equal(actual, expected, 'should a minified json in a custom format');

    test.done();
  },

  empty_file: function (test) {
    test.expect(1);
    const actual = grunt.file.read('.tmp/empty_file.json');
    const expected = grunt.file.read('.tmp/empty_file.json');
    test.equal(actual, expected, 'should do when an empty file is given');

    test.done();
  }
};