module.exports = function(grunt) {
  grunt.registerTask('production', [
    'concurrent:clean',
    'copy:data',
    'spritesheet:passive',
    'json-minify:data',
    'assemble:production',
    'assemble:blog_production',
    'concurrent:dev_copy',
    'concurrent:dist',

    'useminPrepare',

    'concat',
    'cssmin',
    'uglify',
    'concurrent:copy',
    'rev',
    'usemin',

    'htmlmin',
    //'json-minify:data'

    'clean:devcss'
    //'clean:devjs'


  ]);
  grunt.registerTask('prod', [
    'production'
  ]);
};
