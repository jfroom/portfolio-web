// An example configuration file.
exports.config = {
  directConnect: true,
  //seleniumAddress: 'http://localhost:4444/wd/hub', # travis needs this?

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'firefox' // travis needs 'firefox'?
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  suites: {
    app: [
      './e2e/app/app.spec.coffee',
      './e2e/app/app.nav.spec.coffee'
    ],
    work: [
      './e2e/app/work/work.spec.coffee',
      './e2e/app/work/work.nav.spec.coffee',
      './e2e/app/work/work.projects.spec.coffee'
    ]
  },

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
