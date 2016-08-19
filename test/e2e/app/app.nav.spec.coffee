app = new (require('../pageObjects/appPage.coffee'))()

describe "E2E: Testing App.Nav", ->

  describe "Header Nav:", ->
    beforeEach (done) ->
      app.get done

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

    beforeEach (done) ->
      app.get done, false
      browser.driver.manage().window().setSize(320, 480).then done

    it "should have nav when window is less than breakpoint for mobile", ->

      # toggle visible?
      expect($(rwdToggleBtnSelector).isPresent()).toBe true
      expect($(rwdToggleBtnSelector).isDisplayed()).toBe true

      # flyout should be hidden
      expect($(rwdHeaderNavSelector).isPresent()).toBe true
      expect($(rwdHeaderNavSelector).isDisplayed()).toBe false

    it "should open when clicking toggle", ->

      # click to open
      $(rwdToggleBtnSelector).click().then ->

        # flyout should be visible
        expect($(rwdHeaderNavSelector).isDisplayed()).toBe true


    it "should change path and close after clicking offcanvas nav item", ->
      slideDelay = 750
      browser.$(rwdToggleBtnSelector).click()
      browser.sleep slideDelay

      # path changes
      getNavClickResults rwdNavItemCss, rwdNavItemActiveCss, slideDelay, (results) ->
        expect(results.targetPath).toEqual results.curPath

      # nav closes
      browser.sleep slideDelay
      expect($(rwdHeaderNavSelector).isDisplayed()).toBe false

getNavClickResults = (clickOnItemCssSelector, clickOnItemCssSelectorActive, clickDelay, done) ->
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

  browser.sleep clickDelay
  navItemEl.click()
  browser.sleep clickDelay

  # find active element, get it's label - if exists (mobile doesn't use active class)
  $(clickOnItemCssSelectorActive).isPresent().then (bol) ->
    if bol
      $(clickOnItemCssSelectorActive).getText().then (str) ->
        out.curLabel = str

  # get current url
  browser.getCurrentUrl().then (url) ->
    parts = url.split("#!")
    out.curPath = parts[1]
    done out
