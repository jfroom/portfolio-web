module.exports = function(grunt) {
  grunt.registerTask('upload', [
  	'production',
    's3:upload'
  ]);
};
