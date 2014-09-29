module.exports = function(grunt) {
  grunt.registerTask('gh-pages-upload', [
    'production',
    'gh-pages'
  ]);
};
