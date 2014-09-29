/*
 * assemble-contrib-wordcount
 * https://github.com/assemble/assemble-contrib-wordcount
 *
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'index.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Pull down a list of repos from Github.
     * (bundled with the readme task)
     */
    repos: {
      assemble: {
        options: {
          username: 'assemble',
          include: ['contrib'],
          exclude: ['example', 'wordcount', 'rss']
        },
        files: {
          'docs/repos.json': ['repos?page=1&per_page=100']
        }
      }
    },

    /**
     * Extend context for templates
     * with repos.json
     */
    readme: {
      options: {
        metadata: ['docs/repos.json']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('grunt-repos');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'readme']);
};
