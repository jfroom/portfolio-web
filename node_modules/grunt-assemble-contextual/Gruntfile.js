/*
 * assemble-contrib-contextual
 * https://github.com/assemble/assemble-contrib-contextual
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      all: ['Gruntfile.js', 'index.js']
    },

    assemble: {
      options: {
        plugins: ['./index.js']
      },
      contextual: {
        options: {
          contextual: {
            dest: 'test/tmp'
          }
        },
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/pages',
            src: ['**/*.hbs'],
            dest: 'test/actual'
          }
        ]
      }
    },

    // Before generating new files, remove any files from previous build.
    clean: {
      actual: ['test/{actual,tmp}/**'],
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and generate readme.
  grunt.registerTask('default', ['jshint', 'clean', 'assemble']);
};
