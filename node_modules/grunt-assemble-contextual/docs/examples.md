```js
assemble: {
  options: {
    plugins: ['{%= name %}', 'other/plugins/*.js'],
    {%= shortname(name) %}: {
      dest: 'tmp/'
    }
  }
}
```