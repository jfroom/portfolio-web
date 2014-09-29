/*
 * grunt-readme
 * https://github.com/assemble/grunt-readme
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('_config.yml'),

    jshint: {
      all: ['Gruntfile.js', 'test/*.js', '*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    title: 'this title is from the config (root context).',
    description: 'this description is from the config (root context).',

    // Pull down a list of repos from Github.
    assemble: {
      options: {
        flatten: true,
        subtitle: 'This subtitle is a custom property in the Assemble options',

        // Ensure that assets path calculates properly
        assets: 'test/assets',
        data: ['test/fixtures/data/*.json'],
        partials: ['test/fixtures/includes/*.hbs'],
        layout: 'test/fixtures/layouts/default.hbs',
        helpers: ['index.js'],
      },
      site_data: {
        options: {
          site: '<%= site %>'
        },
        files: {
          'test/actual/site_data/': ['test/fixtures/*.{hbs,md}']
        }
      },
      options_context: {
        options: {
          title: 'this title is from the options.',
          description: 'this description is from the options.'
        },
        files: {
          'test/actual/options_data/': ['test/fixtures/*.{hbs,md}']
        }
      },
      root_context: {
        files: {
          'test/actual/root_context/': ['test/fixtures/*.{hbs,md}']
        }
      }
    },

    // Pull down a list of repos from Github.
    repos: {
      helpers: {
        options: {
          username: 'helpers',
          include: ['handlebars-helper', 'partial'],
          exclude: ['examples']
        },
        files: {
          'docs/helpers.json': ['repos?page=1&per_page=100']
        }
      }
    },

    // Use helpers.json for context to generate list
    // of related repos
    readme: {
      options: {
        metadata: ['docs/helpers.json']
      }
    },

    clean: {
      test: ['test/actual/**/*.html']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('grunt-repos');
  grunt.loadNpmTasks('assemble');

  // Docs
  grunt.registerTask('docs', ['repos', 'readme']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'clean', 'assemble', 'readme']);

};
