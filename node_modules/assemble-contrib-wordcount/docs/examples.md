### Basic example

**In your templates**

* `class="wordcount"` must wrap the content that the plugin should run against
* `class="label-wordcount"` on the element that should render the wordcount.
* `class="label-reading-time"` on the element that should render the reading time.

```html
<!-- Blog Posts -->
<div class="wordcount">
  <span class="label-wordcount"> words</span>
  <span class="label-reading-time"> read</span>
  {{> body }}
</div>
```

**Rendered HTML**

```html
<!-- Blog Posts -->
<div class="wordcount">
  <span class="label-wordcount" data-wordcount="1561">1561 words</span>
  <span class="label-reading-time" data-reading-time="7 min">7 min read</span>
  <p>In deserunt venison doner velit cow pastrami magna dolore ut jerky proident
  esse laborum. Fatback strip steak biltong tri-tip beef pork belly spare ribs
  in ut capicola. Sunt qui t-bone jerky est culpa. Deserunt duis adipisicing
  ullamco ex, eiusmod beef salami labore non chuck occaecat tenderloin shank
  cillum. Quis t-bone hamburger pancetta aliqua dolor. Magna eu ground round
  aliqua...
</div>
```

### Change selectors

The default selector is `.wordcount`. You can change this in the options as follows:

```js
assemble: {
  options: {
    plugins: ['assemble-contrib-wordcount'],
    wordcount: {
      selector: '.foo',
      countSelector: '.bar'
      timeSelector: '.baz'
    }
  },
  files: {}
}
```
And in your templates:

```html
<!-- Blog Posts -->
<div class="foo">
  {{> post }}
</div>
```
Then in `post.hbs`:

```html
<!-- Post -->
<article class="post">
  <h1>Breaking News</h1>
  <span class="bar"> words</span>
  <span class="baz"> read</span>
</article>
```

### Display seconds

In the plugin's options in the Assemble task, define `seconds: true`:

```js
assemble: {
  options: {
    plugins: ['assemble-contrib-wordcount'],
    wordcount: {
      seconds: true
    }
  },
  files: {}
}
```

The result will look something like this:

```html
<span class="label-wordcount" data-wordcount="1561">1561 words</span>
<span class="label-reading-time" data-reading-time="7 minutes, 48 seconds">7 minutes, 48 seconds read</span>
```

If less than 1 minute, the results will look something like this:

```html
<span class="label-wordcount" data-wordcount="12">12 words</span>
<span class="label-reading-time" data-reading-time="2 seconds">2 seconds read</span>
```


### Placement
By default, wordcount and reading time are prepended to the text node of the specified element. Example:

```html
<span class="label-wordcount" data-wordcount="1561">1561 words</span>
<span class="label-reading-time" data-reading-time="7 minutes, 48 seconds">7 minutes, 48 seconds read</span>
```

You can change this to `append` in the options:

```js
options: {
  wordcount: {
    placement: 'append'
  }
}
```
And this template:

```html
<span class="label-wordcount">Words: </span>
<span class="label-reading-time">Estimated reading time: </span>
```

Would result in:

```html
<span class="label-wordcount" data-wordcount="1561">Words: 1561</span>
<span class="label-reading-time" data-reading-time="7 minutes, 48 seconds">Estimated reading time: 8 minutes</span>
```