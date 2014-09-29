# portfolio-web [![Build Status](https://travis-ci.org/jfroom/portfolio-web.png)](https://travis-ci.org/jfroom/portfolio-web) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
&nbsp;

##Overview
Static portfolio website template [http://jfroom.github.io/portfolio-web](http://jfroom.github.io/portfolio-web)

###Intent
This project is used to generate my portfolio site and blog. It's a loose framework stubbed out with generic data. Via the settings and data files, meaningful content can be loaded in. The project has been open sourced for academic and sharing purposes. Fork it if you want to, but it not closely maintained.

###Technologies
The project leverages:

- [GruntJS][^grunt]
- [Assemble][^assemble] with [Handlebars][^handlebars]
- [Angular][^angular]
- [Coffeescript][^coffeescript]
- [Karma Runner][^karma]
- [Protractor][^protractor]
- [Bootstrap][^bootstrap]
- [Sass][^sass]
- [Bower][^bower]
- [Yeoman][^yeoman]
- [Travis][^travis]
- [SauceLabs][^sauce]
- [Plato Reporter][^plato]

[^yeoman]: http://yeoman.io/
[^grunt]: http://gruntjs.com/
[^assemble]: http://assemble.io/
[^handlebars]: http://handlebarsjs.com/
[^angular]: http://angularjs.org/
[^sass]: http://sass-lang.com/
[^coffeescript]: http://coffeescript.org/
[^bower]: http://bower.io/
[^karma]: http://karma-runner.github.io/
[^protractor]: https://github.com/angular/protractor
[^jenkins]: http://jenkins-ci.org/
[^bootstrap]: http://getbooktstrap/
[^sauce]: https://saucelabs.com/
[^travis]: https://travis-ci.org/
[^plato]: https://github.com/es-analysis/plato



## Getting Started

This website requires Node/NPM `~0.10.31`, and Grunt `~0.4.5`

_If you haven't used [Node][^node] or [NPM][^npm] before, be sure to check out the linked documentation._

_If you haven't used [grunt][^grunt] before, be sure to check out the [Getting Started][^gruntstart] guide._

[^node]: http://nodejs.org
[^npm]: https://npmjs.org/
[^gruntstart]: http://gruntjs.com/

###Dependencies

I have added all *bower_components* and *node_module* dependencies directly to the repository so that this project will be more self contained for deployment purposes. This is a best practice outlined by [Mikeal Rogers for NPM modules][^mikael] and [Addy Osmani for Bower components][^addy].

`node-spritesheet` requires [ImageMagick be installed](https://github.com/richardbutler/node-spritesheet#requirements).

[^mikael]: http://www.futurealoof.com/posts/nodemodules-in-git.html
[^addy]: http://addyosmani.com/blog/checking-in-front-end-dependencies/


##Build

These build tasks are derived from [Yeoman][^yeoman]'s [WebApp][^webapp] generator and a handful of other tools in the grunt ecosystem.
[^webapp]: https://github.com/yeoman/generator-webapp

####Development

`grunt dev` Create the development build.

`grunt serve` Create the development build, start a local webserver, serve it with live reload and watch for file changes for a refresh.

`grunt images` Create the spritesheets. `grunt dev` and `grunt prod` will passively create the output sprites if they do not exist, but currently if you want to include new sprites or alter existing ones, you'll need to do a foced new build by running this command.

####Production

`grunt prod` Create a deployable build in the _dist_ folder.

`grunt serve:prod` Create a deployable build, start a local webserver and serve it with live reload.

####Deploy

`grunt upload` Compile the production build and push the results to Amazon's S3 storage based on configuration settings.

`grunt gh-pages-upload` Do production build, upload to [github pages](https://pages.github.com/).

##Project Settings

In `settings.json` are configuration variables that will be merged back into node's globally accessible `process.env` object. Example variables include: SERVER_HOSTNAME, SERVER_PORT, SAUCE_USERNAME, SAUCE_KEY, S3_PORTFOLIO_USER, PATH_BLOB.

These values can also be overwritten by any __environment variables__, this is how secret values such as S3 or Sauce credentials get passed in. To learn more about configuring environment variables for your OS, reference google search.

In a shell, an alternate settings file can be loaded: `PATH_PORTFOLIO_SETTINGS=~/sites/private/settings.json grunt serve`. This is how I can use the same codebase to develop the generic framework and my personal portfolio and blog.



##Test
###Units
`grunt test:unit` Runs the Karma Runner tests localed in `test/unit` folder.

For configuration options, see _tasks/test_task.js_, _tasks/options/karma.js_, _test/karma-unit.conf.js_.

###Integration/E2E
The integration tests use [Protractor][^protractor] and [Selenium's WebDriver][^seleniumwebdriver] API for browser automation.

1. See these instructions on [how to get Selenium server installed][^seleniumserver] on your system.

2. Start the server `webdriver-manager start` in a separate terminal process.

3. Start the served version (either the development or production builds) of the project in a separate terminal process.

4. `grunt test:e2e` runs the protractor/jasmine tests located in _test/e2e_.

`grunt test` runs both unit and integration tests.

####Configuration
For configuration options, target browsers and [SauceLabs][^sauce] connections, see _tasks/test_task.js_, _tasks/options/protractor.js_, _test/protractor-e2e.conf.js_.

[^seleniumserver]: https://github.com/angular/protractor#appendix-a-setting-up-a-standalone-selenium-server
[^seleniumwebdriver]: http://www.seleniumhq.org/projects/webdriver/



##Demo Data
This repository contains vanilla demo data for the projects section. The `PATH_PORTFOLIO_DATA` settings/enviornment variables provide a way to pass in data from an alternate location. This is how I'm able to store the project data in a private repository.



##License
Copyright (c) 2013-2014 JFMK, LLC.
Released under the [MIT License][^license].
[^license]: https://github.com/jfroom/portfolio-web/blob/master/LICENSE




