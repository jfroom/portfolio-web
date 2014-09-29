/*
 * Handlebars Helper: Moment.js 
 * @author: https://github.com/Arkkimaagi
 * Built for Assemble: the static site generator and 
 * component builder for Node.js, Grunt.js and Yeoman.
 * http://assemble.io
 *
 * Copyright (c) 2013, Upstage
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
      all: {
        src: ['moment.js', 'Gruntfile.js']
      }
    },

    assemble: {
      options: {
        flatten: true,
        helpers: ['moment.js'],
        layout: 'src/layout.hbs'
      },
      examples: {
        src: ['src/examples.hbs'],
        dest: './examples/'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('default', ['jshint', 'assemble', 'readme']);
};
