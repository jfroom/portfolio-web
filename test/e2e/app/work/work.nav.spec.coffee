app = new (require('../../pageObjects/appPage.coffee'))()
urls = {}

describe "E2E: Testing Work Nav", ->

  # load run time JSON data from page, tricky async
  beforeAll (done) ->
    app.get app.URL_HASH.WORK
    app.getAppDataAsync (data) ->
      workData = data.work.projects
      urls =
        first: app.getUrl "#{app.URL_HASH.WORK}/#{workData[0].id}"
        back: app.getUrl "#{app.URL_HASH.WORK}/#{workData[workData.length - 1].id}"
        next: app.getUrl "#{app.URL_HASH.WORK}/#{workData[1].id}"
      done()

  beforeEach ->
    app.get app.URL_HASH.WORK

  describe 'nav buttons', ->
    testNextBackBtns = (btnGroupSelector, done) ->
      # assign buttons
      browser.navigate().to(urls.first)
      $$(btnGroupSelector).then (arr) ->
        btnBack = arr[0]
        # btm has up button in middle position
        btnNext = arr[if arr.length is 3 then 2 else 1]
        btnBack.click()
        browser.waitForAngular()
        browser.getCurrentUrl().then (url) ->
          expect(url).toEqual(urls.back)
          btnNext.click()
          browser.waitForAngular()
        browser.getCurrentUrl().then (url) ->
          expect(url).toEqual(urls.first)
          btnNext.click()
          browser.waitForAngular()
          browser.getCurrentUrl().then (url) ->
            expect(url).toEqual(urls.next)
            done()

    it 'should be functional next/back project navigation buttons: top buttons', (done) ->
      testNextBackBtns '.work-nav .btn-group a', ->
        done()

    it 'should be functional next/back project navigation buttons: btm buttons', (done) ->
      testNextBackBtns '.work-nav-btm .btn-group a', ->
        done()

    unless app.isPhantomBrowser
      it 'should have functional top button in bottom navigation row', (done) ->
        browser.navigate().to(urls.first)
        #scroll to top
        browser.executeScript('$("html,body").scrollTop(0);')
        oldScrollY = -1

        browser.executeScript("return window.testUtils.getScrollTop();").then (result) ->
          oldScrollY = result

          # btn top
          $$('.work-nav-btm .btn-group a').get(1).click()
          browser.waitForAngular()
          browser.executeScript("return window.testUtils.getScrollTop();").then (result) ->
            curScrollY = result
            expect(curScrollY != oldScrollY).toBe(true)
            done()
