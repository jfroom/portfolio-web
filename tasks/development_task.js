module.exports = function(grunt) {
    grunt.registerTask('development', [
        'clean:tmp',
        'clean:dist',
        'spritesheet:passive',
        'sass:development',
        //'recess',
        'coffee:development',
        //'plato:mycode',

        'concurrent:dev_copy',
        'json-minify:data',
        'assemble:development',
        'assemble:blog_development',
        'clean:devcss'
    ]);
    grunt.registerTask('dev', [
        'development'
    ]);
};
