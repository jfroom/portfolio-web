# TODO: use env var for url + port

# BASE_URL = "#{process.env.DEV_HOSTNAME}/#{process.env.SERVER_PORT}" # This works only when in running with grunt
BASE_URL = 'http://localhost:9090/'
logDebug = true

class AppPage
  URL_HASH:
    HOME: ''
    WORK: 'work'
    ABOUT: 'about'
  ANCHOR_SCROLL_DURATION: 500
  isPhantomBrowser: false
  isSafariBrowser: false
  utilsJS: "window.testUtils={" +
    "getScrollTop:function(){var e,t;if(typeof pageYOffset!==\"undefined\"){return pageYOffset}else{e=document.body;t=document.documentElement;t=t.clientHeight?t:e;return t.scrollTop}}" +
    ",isPhantomBrowser: /phantom/i.test(navigator.userAgent)" +
    ",isSafariBrowser: /Safari/i.test(navigator.userAgent) && !(/Chrome/i.test(navigator.userAgent))" +
    "};"

  get: (done, hash = null, isMaxSize = true) ->
    browser.get(@getUrl(hash)).then =>
      browser.waitForAngular()
      @loadUtilsJS()
      if isMaxSize
        browser.driver.manage().window().maximize().then done
      else
        done()

  getUrl: (hash = null) ->
    url = BASE_URL
    url += "#!/#{hash}" if hash?
    url

  getAppDataAsync: (done) ->
    return done(@appData) if @appData?
    browser.executeScript("return window.appData;").then (result) =>
      @appData = result
      done @appData

  loadUtilsJS: (done) ->
    browser.executeScript(@utilsJS + ";" +
        "out = { isPhantomBrowser: window.testUtils.isPhantomBrowser," +
        "isSafariBrowser: window.testUtils.isSafariBrowser };" +
        "return out;"
    ).then (result) ->
      @isPhantomBrowser = result.isPhantomBrowser
      @isSafariBrowser = result.isSafariBrowser
      done?()

  log: (s) ->
    console.log s if logDebug

  _assertUrlHash: (hash, done) ->
    targetUrl = @getUrl hash
    browser.navigate().to(targetUrl)
    browser.getCurrentUrl().then (url) ->
      parts = url.split("#!")
      expect(parts[1]).toEqual "/" + hash
      done()

  navigateAssert: (hash, done, anchorId = hash) ->
    anchorId = "home" if hash is ''
    if @isPhantomBrowser
      @_assertUrlHash hash, done
    else
      @_assertUrlHash hash, =>
        browser.sleep @ANCHOR_SCROLL_DURATION
        browser.executeScript(@utilsJS + ";return window.testUtils.getScrollTop();").then (scrollY) =>
          script = "return $('##{anchorId}').position().top;"
          browser.executeScript(script).then (anchorY) ->
            expect(Math.floor(scrollY)).toEqual(Math.floor(anchorY))
            done()

  scrollTo: (y, done) ->
    browser.executeScript("$('html,body').scrollTop(#{y});").then done

  scrollToCss: (css, done = (->)) ->
    # Scroll target onto screen, with a little offset for possible sticky nav
    script = "$('html,body').scrollTop($('#{css}').first().offset().top - 100);"
    browser.executeScript(script).then ->
      done()

module.exports = AppPage
