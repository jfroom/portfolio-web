# grunt-assemble-wordcount [![NPM version](https://badge.fury.io/js/grunt-assemble-wordcount.svg)](http://badge.fury.io/js/grunt-assemble-wordcount)

> Assemble plugin for displaying wordcount and average reading time to blog posts or pages.

## Quickstart

In the command line, run:

```bash
npm install grunt-assemble-wordcount --save
```

Next, register the plugin with Assemble:

```js
assemble: {
  options: {
    plugins: ['grunt-assemble-wordcount', 'other/plugins/*']
  }
}
```

Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.

## Options

### speed

Type: `Number`
Default: `300`

Average "words per minute" to use for calculating reading time. This plugin uses 300 as the default based on the averages listed in [this Forbes article](http://onforb.es/1crk3KF).

### seconds

Type: `Boolean`
Default: `undefined`

Define `seconds: true` in the option to display seconds and minutes. Example: `7 min, 47 sec`. (by default time is rendered in 1 minute increments, e.g. `8 min`).

### placement

Type: `String`
Default: `prepend`

Determines whether the wordcount and reading time will be prepended or appended. Example:

### selector

Type: `String`
Default: `.wordcount`

The selector to target for the element that wraps the content that contains the words to count.

### countSelector

Type: `String`
Default: `.label-wordcount`

The selector to use for the element that will render the wordcount.

### timeSelector

Type: `String`
Default: `.label-reading-time`

The selector to use for the element that will render the estimated reading time.

## Usage Examples

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
options: {
  plugins: ['grunt-assemble-wordcount'],
  wordcount: {
    selector: '.foo',
    countSelector: '.bar'
    timeSelector: '.baz'
  }
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

In the plugin's options, define `seconds: true`:

```js
options: {
  plugins: ['grunt-assemble-wordcount'],
  wordcount: {
    seconds: true
  }
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

***

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/assemble/grunt-assemble-wordcount/issues/new).

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## Other grunt-assemble plugins

* [grunt-assemble](https://www.npmjs.com/package/grunt-assemble): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt,… [more](https://www.npmjs.com/package/grunt-assemble) | [homepage](http://assemble.io)
* [grunt-assemble-anchors](https://www.npmjs.com/package/grunt-assemble-anchors): Assemble plugin for creating anchor tags from headings in generated html using Cheerio.js. | [homepage](https://github.com/assemble/grunt-assemble-anchors)
* [grunt-assemble-contextual](https://www.npmjs.com/package/grunt-assemble-contextual): Generates a JSON file with the context of each page. Basic plugin to help see… [more](https://www.npmjs.com/package/grunt-assemble-contextual) | [homepage](https://github.com/assemble/grunt-assemble-contextual)
* [grunt-assemble-decompress](https://www.npmjs.com/package/grunt-assemble-decompress): Assemble plugin for extracting zip, tar and tar.gz archives. | [homepage](https://github.com/assemble/grunt-assemble-decompress)
* [grunt-assemble-download](https://www.npmjs.com/package/grunt-assemble-download): Assemble plugin for downloading files from GitHub. | [homepage](https://github.com/assemble/grunt-assemble-download)
* [grunt-assemble-i18n](https://www.npmjs.com/package/grunt-assemble-i18n): Plugin for adding i18n support to Assemble projects. | [homepage](https://github.com/assemble/grunt-assemble-i18n)
* [grunt-assemble-lunr](https://www.npmjs.com/package/grunt-assemble-lunr): Assemble plugin for adding search capabilities to your static site, with lunr.js. | [homepage](http://assemble.io)
* [grunt-assemble-navigation](https://www.npmjs.com/package/grunt-assemble-navigation): Assemble navigation plugin. Automatically generate Bootstrap-style, multi-level side nav. See the sidenav on assemble.io for… [more](https://www.npmjs.com/package/grunt-assemble-navigation) | [homepage](https://github.com/assemble/grunt-assemble-navigation)
* [grunt-assemble-permalinks](https://www.npmjs.com/package/grunt-assemble-permalinks): Permalinks plugin for Assemble, the static site generator for Grunt.js, Yeoman and Node.js. This plugin… [more](https://www.npmjs.com/package/grunt-assemble-permalinks) | [homepage](https://github.com/assemble/grunt-assemble-permalinks)
* [grunt-assemble-toc](https://www.npmjs.com/package/grunt-assemble-toc): Assemble middleware for adding a Table of Contents (TOC) to any HTML page. | [homepage](http://assemble.io)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on September 25, 2015._