log "--> app.nav.spec.js"
describe "E2E: Testing App.Nav", ->

  beforeEach ->
    browser.get '/'
    #webPage.setWindowMax()
    #webPage.pause global.specUtils.anchorScrollDuration

  describe "Header Nav:", ->
    testNavItemCss = ".navbar-top .navbar-nav li:nth-child(1) a"
    testNavItemCss2 = ".navbar-top .navbar-nav li:nth-child(2) a"
    testNavItemActiveCss = ".navbar-top .navbar-nav li.active"
    it "clicking on nav item should update path", ->
      getNavClickResults testNavItemCss, testNavItemActiveCss, 0, (results) ->
        expect(results.targetPath).toEqual results.curPath


    it "clicking on nav item should give that item \"active\" class", ->
      getNavClickResults testNavItemCss, testNavItemActiveCss, 0, (results) ->
        expect(results.targetPath).toEqual results.curPath


    it "clicking on nav item should update path from old nav item to new nav item", ->
      getNavClickResults testNavItemCss, testNavItemActiveCss, 0, (results) ->
        getNavClickResults testNavItemCss2, testNavItemActiveCss, 0, (results2) ->
          expect(results.curPath isnt results2.curPath).toEqual true



    it "clicking on nav item should give that item \"active\" class and deselect old nav item", ->
      getNavClickResults testNavItemCss, testNavItemActiveCss, 0, (results) ->
        getNavClickResults testNavItemCss2, testNavItemActiveCss, 0, (results2) ->
          expect(results.curLabel isnt results2.curLabel).toEqual true




  describe "RWD Offcanvas:", ->
    rwdToggleBtnSelector = ".navbar-top.offcanvas-slide .navbar-toggle"
    rwdNavItemCss = "header.flyout .navbar-nav li:nth-child(1) a"
    rwdNavItemActiveCss = "header.flyout .navbar-nav li.active"
    rwdHeaderNavSelector = "header.flyout"
    beforeEach ->
      webPage.setWindowSize 320, 480

    it "should have nav when window is less than breakpoint for mobile", ->

      #toggle visible?
      expect(webPage.exists.css(rwdToggleBtnSelector)).toBe true
      expect(browser.$(rwdToggleBtnSelector).isDisplayed()).toBe true

      # flyout should be hidden
      expect(webPage.exists.css(rwdHeaderNavSelector)).toBe true
      expect(browser.$(rwdHeaderNavSelector).isDisplayed()).toBe false

    it "should open when clicking toggle", ->

      # click to open
      browser.$(rwdToggleBtnSelector).click().then ->

        # flyout should be visible
        expect(browser.$(rwdHeaderNavSelector).isDisplayed()).toBe true


    it "should change path and close after clicking offcanvas nav item", ->
      browser.$(rwdToggleBtnSelector).click()
      webPage.pause 750

      # path changes
      getNavClickResults rwdNavItemCss, rwdNavItemActiveCss, 750, (results) ->
        expect(results.targetPath).toEqual results.curPath


      # nav closes
      webPage.pause 750
      expect(browser.$(rwdHeaderNavSelector).isDisplayed()).toBe false


  getNavClickResults = (clickOnItemCssSelector, clickOnItemCssSelectorActive, clickDelay, cb) ->
    navItemEl = undefined
    out =
      targetPath: ""
      targetLabel: ""
      curPath: ""
      curLabel: ""

    # find target item
    navItemEl = browser.$(clickOnItemCssSelector)

    # store targetPath
    navItemEl.getAttribute("util-change-path").then (val) ->
      out.targetPath = val


    # store targetLabel
    navItemEl.getText().then (str) ->
      out.targetLabel = str

    webPage.pause clickDelay
    navItemEl.click()
    webPage.pause clickDelay

    # find active element, get it's label - if exists (mobile doesn't use active class)
    webPage.exists.css(clickOnItemCssSelectorActive).then (bol) ->
      if bol
        browser.$(clickOnItemCssSelectorActive).getText().then (str, err) ->
          out.curLabel = str



    # get current url
    webPage.url().then (url) ->
      parts = url.split("#!")
      out.curPath = parts[1]

      #log("[getNavClickResults] targetPath:" + out.targetPath + ", targetLabel:" + out.targetLabel + " curPath:" + out.curPath + " curLabel:" + out.curLabel);
      #exit with result
      cb out

