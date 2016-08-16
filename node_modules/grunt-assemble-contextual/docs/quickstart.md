In the command line, run:

```bash
npm install {%= name %} --save
```

Next, to register the plugin with Assemble in your project's Gruntfile you can either specify the direct path to the plugin(s) (e.g. `./path/to/plugins/*.js`), or if installed via npm, make sure the plugin is in the `devDependencies` of your project.js package.json, and simply add the module's name to the `plugins` option:

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    assemble: {
      options: {
        plugins: ['{%= name %}', 'other/plugins/*.js'],
        contextual: {
          dest: 'tmp/'
        }
      },
      files: {
        'dist/': ['templates/*.hbs']
      }
    }
  });
  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['assemble']);
};
```
If everything was installed and configured correctly, after running `grunt assemble` you should see a JSON file for each page in the `dest` directory defined in the plugin's options. The basename of each page will be used as the name of each file.

_This plugin will make the build run slower!_ To disable it simple remove it from the options or remove the `dest` property.


Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.
