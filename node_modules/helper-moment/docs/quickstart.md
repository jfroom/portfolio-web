Install the helper:

```bash
npm i helper-moment --save-dev
```

Now add the helper to Assemble's options:

```js
assemble: {
  options: {
    // Assemble will automatically resolve the path
    helpers: ['helper-moment', 'foo/*.js']
  }
}
```