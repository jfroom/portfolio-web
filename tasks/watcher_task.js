module.exports = function(grunt) {
  grunt.registerTask('watchcontexthelper', function(target) {
    switch (target) {
      case 'gruntfile':
        console.log('Spawning a child process for complete rebuild...');
        var child;

        var showDone = function() {
          console.log('Done');
        };

        if (grunt.watchcontext === 'production') {
          child = grunt.util.spawn({
            grunt: true,
            args: ['production']
          }, showDone);
        } else {
          child = grunt.util.spawn({
            grunt: true,
            args: ['development']
          }, showDone);
        }
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
        break;

      case 'js':
        (grunt.watchcontext === 'production') ?
          grunt.task.run(['clean:js', 'copy:jsApp', 'copy:jsVendor', 'concat', 'uglify']) :
          grunt.task.run(['clean:js', 'concat']);
        break;
      case 'img':
        (grunt.watchcontext === 'production') ?
          grunt.task.run(['clean:img', 'copy:img']) :
          grunt.task.run(['clean:img', 'copy:img']);
        break;
      case 'html':
        (grunt.watchcontext === 'production') ?
          grunt.task.run(['clean:html', 'copy:html', 'assemble:production', 'assemble:blog_production']) :
          grunt.task.run(['clean:html', 'copy:html', 'assemble:development', 'assemble:blog_development']);
        break;
      case 'sass':
        (grunt.watchcontext === 'production') ?
          grunt.task.run(['clean:css', 'sass:dist', 'cssmin', 'clean:devcss']) :
          grunt.task.run(['clean:css', 'sass:development']);
        break;
      case 'less':
        (grunt.watchcontext === 'production') ?
          grunt.task.run(['clean:css', 'recess:dist', 'cssmin', 'clean:devcss']) :
          grunt.task.run(['clean:css', 'recess']);
        break;

    }
  });
};
