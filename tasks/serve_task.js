module.exports = function(grunt) {
  grunt.registerTask('serve', function(target) {
    console.log('serve target:' + target);
    if (target === 'dist') {
      return grunt.task.run([
        'production',
        'connect:dist:keepalive',
        'open'
      ]);
    }

    if (target === 'prod' || target === 'production') {
      grunt.watchcontext = 'production';
      return grunt.task.run([
        'production',
        'connect:dist',
        'open',
        'watch',
      ]);
    }

    grunt.task.run([
      'development',
      'connect:livereload',
      'open',
      'watch',
    ]);
  });
};
