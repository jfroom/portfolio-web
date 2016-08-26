app = new (require('../../pageObjects/appPage.coffee'))()
urls = {}

describe "E2E: Testing Work Nav", ->

  # load run time JSON data from page, tricky async
  beforeAll (done) ->
    app.get ->
      app.getAppDataAsync (data) ->
        workData = data.work.projects
        urls =
          first: app.getUrl "#{app.URL_HASH.WORK}/#{workData[0].id}"
          back: app.getUrl "#{app.URL_HASH.WORK}/#{workData[workData.length - 1].id}"
          next: app.getUrl "#{app.URL_HASH.WORK}/#{workData[1].id}"
        done()
    , app.URL_HASH.WORK

  beforeEach (done) ->
    app.get done, app.URL_HASH.WORK

  describe 'nav buttons', ->
    testNextBackBtns = (btnGroupSelector, done) ->
      # assign buttons
      browser.navigate().to(urls.first).then ->
        browser.sleep app.ANCHOR_SCROLL_DURATION
        $$(btnGroupSelector).then (arr) ->
          btnBack = arr[0]
          btnNext = arr[if arr.length is 3 then 2 else 1] # btm has up button in middle position

          # navigate back
          app.scrollToCss btnGroupSelector # Firefox driver needs link to be on screen
          btnBack.click()
          browser.sleep app.ANCHOR_SCROLL_DURATION
          browser.getCurrentUrl().then (url) ->
            expect(url).toEqual(urls.back)

          # navigate next
          app.scrollToCss btnGroupSelector # Firefox driver needs link to be on screen
          btnNext.click()
          browser.sleep app.ANCHOR_SCROLL_DURATION
          browser.getCurrentUrl().then (url) ->
            expect(url).toEqual(urls.first)

          # navigate next
          app.scrollToCss btnGroupSelector # Firefox driver needs link to be on screen
          btnNext.click()
          browser.sleep app.ANCHOR_SCROLL_DURATION
          browser.getCurrentUrl().then (url) ->
            expect(url).toEqual(urls.next)
            done()

    it 'should be functional next/back project navigation buttons: top buttons', (done) ->
      testNextBackBtns '.work-nav .btn-group a', done

    it 'should be functional next/back project navigation buttons: btm buttons', (done) ->
      testNextBackBtns '.work-nav-btm .btn-group a', done

    it 'should have functional top button in bottom navigation row', (done) ->
      browser.navigate().to(urls.first).then ->
        # scroll to top
        browser.sleep app.ANCHOR_SCROLL_DURATION
        app.scrollTo 0, ->
          browser.sleep app.ANCHOR_SCROLL_DURATION
          browser.executeScript("return window.testUtils.getScrollTop();").then (oldScrollY) ->
            btnGroupSelector = '.work-nav-btm .btn-group a'
            app.scrollToCss btnGroupSelector, -> # Firefox driver needs link to be on screen

              browser.sleep app.ANCHOR_SCROLL_DURATION
              $$(btnGroupSelector).get(1).click() # btn top
              browser.sleep app.ANCHOR_SCROLL_DURATION
              browser.executeScript("return window.testUtils.getScrollTop();").then (curScrollY) ->
                expect(Math.floor(curScrollY) isnt Math.floor(oldScrollY)).toBe(true)
                done()

  it 'arrow keys will navigate', (done) ->
    body = $('body')
    body.sendKeys(protractor.Key.ARROW_RIGHT) # no action for right key when work detail hidden
    browser.getCurrentUrl().then (url) ->
      expect(url).toEqual app.getUrl(app.URL_HASH.WORK)
      browser.navigate().to(urls.first).then ->
        body.sendKeys(protractor.Key.ARROW_RIGHT) # nav forward
        browser.getCurrentUrl().then (url) ->
          expect(url).toEqual(urls.next)
          body.sendKeys(protractor.Key.ARROW_LEFT) # nav back
          browser.getCurrentUrl().then (url) ->
            expect(url).toEqual(urls.first)
            body.sendKeys(protractor.Key.ARROW_UP) # no action for up key
            browser.getCurrentUrl().then (url) ->
              expect(url).toEqual(urls.first)
              done()
