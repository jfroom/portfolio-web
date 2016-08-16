'use strict';

const JSON5 = require('json5');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        'tests/**/*.js'
      ]
    },

    clean: ['.tmp'],

    copy: {
      test: {
        expand: true,
        cwd: 'test/fixtures/',
        src: '**',
        dest: '.tmp/'
      }
    },

    'json-minify': {
      default_options: {
        files: '.tmp/default_options.json'
      },
      duplicate_keys: {
        files: '.tmp/duplicate_keys.json'
      },
      custom_transform: {
        options: {
          transform: function (data) {
            return JSON5.stringify(JSON5.parse(data));
          }
        },
        files: '.tmp/custom_transform.json'
      },
      empty_file: {
        options: {
          skipOnError: true
        },
        files: '.tmp/empty_file.json'
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Default task.
  grunt.registerTask('default', 'test');
  grunt.registerTask('test', ['jshint', 'clean', 'copy', 'json-minify', 'nodeunit']);
};
