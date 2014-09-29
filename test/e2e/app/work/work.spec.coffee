log "loading: " + __filename
describe "E2E: Testing Work", ->

  workThumbsSelector = '.work-thumb-list .work-thumb-item a'


  describe 'Basic Navigating', ->
    beforeEach ->
      log 'set window max complete'
      browser.get global.specUtils.workUrl
      #webPage.setWindowMax()
      log 'nav to complete'
      webPage.pause global.specUtils.anchorScrollDuration
      log 'pause complete, before each complete'

    it 'should have work thumbnails', ->
      log 'start first it'
      webPage.find.csss('.work-thumb-list .work-thumb-item a').then (arr) ->
        expect(arr.length > 0).toBe true


    it 'should scroll to work section when loading a project URL', ->
      browser.get '/'
      webPage.pause global.specUtils.anchorScrollDuration
      webPage.find.css(workThumbsSelector).then (el) ->
        hash = '/'
        el.getAttribute('href').then (url) ->
          parts = url.split('#!/')
          hash = parts[1]
          hash = hash.split("/")[0]
          log 'hash: ' + hash + " url:" + url
          global.specUtils.assertUrlHashAndAnchorScroll hash, "work"

    it 'should update URL when clicking project to be project URL', ->
      #already validated that url will load projcet, so just validate url change

      webPage.find.css(workThumbsSelector).then (el) ->
        el.click()
        webPage.pause(global.specUtils.anchorScrollDuration)
        el.getAttribute('href').then (url) ->
          expect(webPage.url()).toBe(url)

    it 'should have hidden work detail section before load', ->
      expect(webPage.find.css('.work-detail').isDisplayed()).toBe false

    it "should load project when clicking first project thumb by verifying visibility and project titles match", ->
      webPage.find.css(workThumbsSelector).click()
      expect(webPage.find.css('.work-detail').isDisplayed()).toBe true
      expect(webPage.find.css('.detail-title ').isDisplayed()).toBe true
      expect(webPage.find.css(workThumbsSelector).getText()).toEqual(webPage.find.css('.detail-title').getText())

    if !global.specUtils.isSafariBrowser #safari has navigate issues and scrollspy issues
      xit "should unload project when using back button", ->
        webPage.find.css(workThumbsSelector).click()
        webPage.pause global.specUtils.anchorScrollDuration
        browser.navigate().back() # back breaks in safari
        expect(webPage.url()).toBe(global.specUtils.workUrl)
        expect(webPage.find.css('.work-detail').isDisplayed()).toBe false

    it 'should load second project after first', ->
      #load first project
      webPage.find.css(workThumbsSelector).click()
      webPage.pause(global.specUtils.anchorScrollDuration)
      title = ''
      webPage.find.css('.detail-title').getText().then (str) ->
        title = str

      #load second project
      webPage.find.csss(workThumbsSelector).then (arr) ->
        expect(arr.length > 1).toBe(true)
        el2 = arr[1]

        title2 = ''
        el2.getText().then (str) ->
          title2 = str
          el2.click()
          expect(webPage.find.css('.detail-title').getText()).toEqual(title2)
          expect(title isnt title2).toBe(true)


