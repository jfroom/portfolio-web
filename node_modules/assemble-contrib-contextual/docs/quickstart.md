In the command line, run:

```bash
npm install {%= name %} --save
```

Next, to register the plugin with Assemble in your project's Gruntfile you can either specify the direct path to the plugin(s) (e.g. `./path/to/plugins/*.js`), or if installed via npm, make sure the plugin is in the `devDependencies` of your project.js package.json, and simply add the module's name to the `plugins` option:

```js
assemble: {
  options: {
    plugins: ['{%= name %}', 'other/plugins/*.js']
  }
}
```

Once that's done, just add `{%= name %}`, the name of this module, to the `plugins` option in the Assemble task:

Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.
