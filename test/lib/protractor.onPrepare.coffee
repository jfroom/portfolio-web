global.logDebug = false
global.__ = require("lodash")
global.grunt = require("grunt")
grunt.log.writeln 'running protractor.onPrepare.coffee'

browser.getCapabilities().then (capabilities) ->
  grunt.log.writeln 'capabilites ' + capabilities.caps_.browserName
  grunt.log.writeln('protractor.shared.coffee loading....')

  #appium
  ###
  if capabilities.caps_.app == 'safari')
    webdriver = require("selenium-webdriver")
    caps = {
      device: 'iPhone Simulator'
    , name: "Appium Hybrid App: with WD"
    , app: "safari"
    , version: '7.0'
    , browserName: ''
    }
    #browser = new RemoteWebDriver("127.0.0.1", 4445, caps)
    browser = new webdriver.Builder().usingServer("http://localhost:4445").withCapabilities(caps).build();

  webdriver = require("selenium-webdriver")
  capabilities = webdriver.Capabilities.iphone()
  capabilities['language'] = 'en';
  capabilities['simulator'] = true;
  browser = new webdriver.Builder()
    .usingServer('http://localhost:4445/wd/hub')
    .withCapabilities(capabilities).build();
  ###

  __.extend global,
    log: (s) ->
      if logDebug
        grunt.log.writeln s
    appData: undefined
    specUtils:
      baseUrl: "http://" + process.env["SERVER_HOSTNAME"] + ":" + process.env["SERVER_PORT"]
      workUrl: "#!/work"
      anchorScrollDuration: 500
      isPhantomBrowser: false
      isSafariBrowser: false
      utilsJS: "window.testUtils={" +
      "getScrollTop:function(){var e,t;if(typeof pageYOffset!==\"undefined\"){return pageYOffset}else{e=document.body;t=document.documentElement;t=t.clientHeight?t:e;return t.scrollTop}}" +
      ",isPhantomBrowser: /phantom/i.test(navigator.userAgent)" +
      ",isSafariBrowser: /Safari/i.test(navigator.userAgent) && !(/Chrome/i.test(navigator.userAgent))" +
      "};"
      getAppDataAsync: (done) ->
        log 'getAppDataAsync: ' + appData
        if !__.isUndefined(appData)
          done(appData)
        else
          browser.executeScript("return window.appData;").then (result) ->
            global.appData = result
            done(appData)
      loadUtilsJS: (done) ->
        browser.executeScript(global.specUtils.utilsJS + ";" +
            "out = { isPhantomBrowser: window.testUtils.isPhantomBrowser," +
            "isSafariBrowser: window.testUtils.isSafariBrowser };" +
            "return out;"
        ).then (result, err) ->
          log 'utils done'
          global.specUtils.isPhantomBrowser = result.isPhantomBrowser
          global.specUtils.isSafariBrowser = result.isSafariBrowser
          log '--isPhantomBrowser:' + global.specUtils.isPhantomBrowser
          log '--isSafariBrowser:' + global.specUtils.isSafariBrowser
          done()

  # inject specUtils.utilsJS
  #log 'try running utils'
  #specUtils.loadUtilsJS ->

  #https://github.com/angular/protractor/pull/145#issuecomment-25709764
  createBrowserHelper = (browser, protractor) ->
    wrapElem = (elem) ->
      elem.val = ->
        elem.getAttribute "value"

      elem
    find:
      input: (modelStr) ->
        wrapElem browser.findElement(protractor.By.input(modelStr))

      textarea: (modelStr) ->
        wrapElem browser.findElement(protractor.By.textarea(modelStr))

      id: (idStr) ->
        wrapElem browser.findElement(protractor.By.id(idStr))

      css: (selector) ->
        wrapElem browser.findElement(protractor.By.css(selector))

      csss: (selector) ->
        wrapElem browser.findElements(protractor.By.css(selector))

      className: (className) ->
        wrapElem browser.findElement(protractor.By.className(className))

      xpath: (xpath) ->
        wrapElem browser.findElement(protractor.By.xpath(xpath))

      binding: (binding) ->
        wrapElem browser.findElement(protractor.By.binding(binding))

    exists:
      input: (modelStr) ->
        wrapElem browser.isElementPresent(protractor.By.input(modelStr))

      textarea: (modelStr) ->
        wrapElem browser.isElementPresent(protractor.By.textarea(modelStr))

      id: (idStr) ->
        wrapElem browser.isElementPresent(protractor.By.id(idStr))

      css: (selector) ->
        wrapElem browser.isElementPresent(protractor.By.css(selector))

      className: (className) ->
        wrapElem browser.isElementPresent(protractor.By.className(className))

      xpath: (xpath) ->
        wrapElem browser.isElementPresent(protractor.By.xpath(xpath))

    setWindowSize: (w, h) ->
      browser.manage().window().setSize w, h

    setWindowMax: () ->
      #chrome dies on this
      #browser.executeScript 'window.moveTo(0,0); window.resizeTo(screen.width, screen.height);', ->
        #nothing

      #browser.manage().window().maximize()

    pause: (ms) ->
      browser.driver.sleep ms

    url: ->
      browser.getCurrentUrl()

    navigateTo: (url, done) ->
      browser.navigate().to(url).then ->
        done()

  global.webPage = createBrowserHelper(browser, protractor)


  global.specUtils.assertUrlHash = (hash, done) ->
    #log ' assertUrlHash ' + hash
    targetUrl = specUtils.baseUrl + "/#!/" + hash
    webPage.navigateTo targetUrl, (err) ->
      #log 'nav done err:' + err
      browser.getCurrentUrl().then (url, err) ->
        parts = url.split("#!")
        #log hash + " page? " + url + " targetURL:" + targetUrl + " parts[1]:" + parts
        expect(parts[1]).toEqual "/" + hash
        done()

  # helper for asserting URL and scrolling
  global.specUtils.assertUrlHashAndAnchorScroll = (hash, anchorId) -> # hash = 'work', anchorId='work'
    if global.specUtils.isPhantomBrowser
      specUtils.assertUrlHash hash, ->
    else
      browser.getCurrentUrl().then (url, err) ->
        updatedScrollY = oldScrollY = -1
        browser.executeScript(specUtils.utilsJS + ";return window.testUtils.getScrollTop();").then (result, err) ->
          oldScrollY = result
          #log 'oldScrollY:' + oldScrollY

          specUtils.assertUrlHash hash, ->

            #log("spec_enums.anchorScrollDuration:" + specUtils.anchorScrollDuration)
            browser.sleep specUtils.anchorScrollDuration

            browser.executeScript(specUtils.utilsJS + ";return window.testUtils.getScrollTop();").then (result, err) ->
              updatedScrollY = result
              #log "new scrollY:" + updatedScrollY + " oldScrollY:" + oldScrollY
              expect(updatedScrollY isnt oldScrollY).toBe true

