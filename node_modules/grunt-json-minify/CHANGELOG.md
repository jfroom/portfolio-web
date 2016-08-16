# Changelog

## Version 1.1.0

 * Options `encoding` and `skipOnError` added.

## Version 1.0.0

 * Node 0.8.0 dropped. Minimum node version is now 4.0.0.

### Breaking Change

JSON5 is removed from this project. But you can reconstruct the previous behaviour by using the following configuration:

First you need to install `json5` manually to your project.

```
npm install json5 --save-dev
```

Then you can use the new `transform` option to define your own minification function.

```js
'json-minify': {
  options: {
    transform: function (data) {
      return JSON5.stringify(JSON5.parse(data));
    }
  },
  build: {
    files: 'build/**/*.json'
  }
}
```