# \{{moment}} [![NPM version](https://badge.fury.io/js/{%= name %}.png)](http://badge.fury.io/js/{%= name %}) {% if (travis) { %} [![Build Status]({%= travis %}.png)]({%= travis %}){% } %}

> {%= description %}

## Quickstart
{%= _.doc("quickstart.md") %}

## Options
{%= _.doc("options.md") %}

## Usage Examples
{%= _.doc("examples.md") %}

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Author

**Mikko Tapionlinna**

+ [github.com/Arkkimaagi](https://github.com/Arkkimaagi)

## License
{%= copyright %}
{%= license %}

***

_This file was generated on {%= grunt.template.date("fullDate") %}._

[moment]: http://momentjs.com/docs/ "Moment.js"
[grunt]: http://gruntjs.com "Grunt.js"