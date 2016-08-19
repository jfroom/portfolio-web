module.exports = function(grunt) {
  grunt.registerTask('test:unit', ['karma:unit']);
  //grunt.registerTask('test:e2e', ['selenium', 'protractor:e2e']);
  //grunt.registerTask('test:e2e', ['protractor:e2e']);
  grunt.registerTask('test:e2e', ['shell:protractor']);
  //grunt.registerTask('test:midway', ['karma:midway']);
  //grunt.registerTask('test:protractor', ['selenium', 'protractor:e2e']);
  grunt.registerTask('test', ['test:unit', 'test:e2e']);
  grunt.registerTask('test:sauce', ['sauce:enable', 'karma:unit', 'protractor:e2e', 'sauce:connect', 'sauce:disconnect']);
  grunt.registerTask('test:sauce:unit', ['sauce:enable', 'karma:unit']);
  grunt.registerTask('test:sauce:connect:e2e', ['sauce:enable', 'sauce:connect', 'protractor:test', 'sauce:disconnect']);
  grunt.registerTask('test:sauce:e2e', ['sauce:enable', 'concurrent:protractor:sauce']);

  grunt.registerTask('test:travis', function (){
    process.env.isTravisBuild = 'true';
    grunt.task.run( ['test:unit'] );
  });
};
