module.exports = function(grunt) {
  grunt.registerTask('upload', [
  	'production',
    's3:dist',
    's3:index_page'
  ]);
};
