var exec = require('child_process').exec;
module.exports = function(grunt) {

  grunt.registerTask('selenium', function () {
    var path = require('path').resolve(process.cwd(),
      'selenium/');
    var isInstalled = grunt.file.exists(path);
    grunt.log.writeln('Is Selenium installed? ' + isInstalled);

    if (!isInstalled) {
      grunt.task.run('selenium-install', 'selenium-server');
    }else{
      grunt.task.run('selenium-server');
    }
  });

  grunt.registerTask('selenium-install', function () {

    grunt.log.writeln('Installing selenium webdriver standalone and chromedriver');
    var path = require('path').resolve(process.cwd(),
      'node_modules/protractor/bin/install_selenium_standalone');
    exec(path, this.async());
  });

  grunt.registerTask('selenium-server', function (){
    var path = require('path').resolve(process.cwd(),
      'selenium/start');
    grunt.log.writeln('Running selenium server');
    exec(path, this.async());
  });
}