In the command line, run:

```bash
npm install assemble-contrib-wordcount --save
```

Next, register the plugin with Assemble in your project's Gruntfile:

```js
assemble: {
  options: {
    plugins: ['{%= name %}', 'other/plugins/*']
  }
}
```
You can also use the plugin with specific targets:

```js
assemble: {
  foo: {
    options: {
      plugins: ['{%= name %}', 'other/plugins/*']
    },
    files: {'dist/': 'content/*.md'}
  },
  // The plugin won't run on this target
  bar: {
    files: {'dist/': 'templates/*.hbs'}
  }
}
```

Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.
