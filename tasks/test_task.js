module.exports = function(grunt) {
  grunt.registerTask('test:unit', ['karma:unit']);
  //grunt.registerTask('test:e2e', ['selenium', 'protractor:e2e']);
  grunt.registerTask('test:e2e', ['protractor:e2e']);
  //grunt.registerTask('test:midway', ['karma:midway']);
  //grunt.registerTask('test:protractor', ['selenium', 'protractor:e2e']);
  grunt.registerTask('test', ['karma:unit', 'test:e2e']);
  grunt.registerTask('test:sauce', ['sauce:enable', 'karma:unit', 'protractor:e2e', 'sauce:connect', 'sauce:disconnect']);
  grunt.registerTask('test:sauce:unit', ['sauce:enable', 'karma:unit']);
  grunt.registerTask('test:sauce:connect:e2e', ['sauce:enable', 'sauce:connect', 'protractor:test', 'sauce:disconnect']);
  grunt.registerTask('test:sauce:e2e', ['sauce:enable', 'concurrent:protractor:sauce']);

  grunt.registerTask('test:travis', function (){
    process.env.isTravisBuild = 'true';
    grunt.task.run( ['karma:unit'] );
  });


  //keeping these around for legacy use
  grunt.registerTask('autotest:unit', ['karma:unit_auto']);
  //grunt.registerTask('autotest:midway', ['karma:midway_auto']);
  grunt.registerTask('autotest:e2e', ['protractor:e2e_auto']);
  grunt.registerTask('autotest', ['karma:unit_auto']);

};
