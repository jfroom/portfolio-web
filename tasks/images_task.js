module.exports = function(grunt) {
  grunt.registerTask('images', [
    'clean:spritesheet',
    'spritesheet:force' //,
    //'imagemin'
  ]);
};
