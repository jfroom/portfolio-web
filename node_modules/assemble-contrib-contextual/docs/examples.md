```js
assemble: {
  options: {
    plugins: ['{%= name %}', 'other/plugins/*.js'],
    {%= shortname %}: {
      dest: 'tmp/'
    }
  }
}
```