app = new (require('../../pageObjects/appPage.coffee'))()

describe "E2E: Testing Work", ->
  workThumbsSelector = '.work-thumb-list .work-thumb-item a'

  describe 'Basic Navigating', ->
    beforeEach (done) ->
      app.get done, app.URL_HASH.WORK

    it 'should have work thumbnails', ->
      $$('.work-thumb-list .work-thumb-item a').count().then (num) ->
        expect(num).not.toBe(0)

    it 'should scroll to work section when loading a project URL', (done) ->
      browser.navigate().to(app.getUrl(app.URL_HASH.HOME))
      $$(workThumbsSelector).first().getAttribute('href').then (url) ->
        parts = url.split('#!/')
        hash = parts[1]
        hash = hash.split("/")[0]
        app.navigateAssert hash, done, 'work'

    it 'should update URL when clicking project to be project URL', ->
      # already validated that url will load project, so just validate url change
      thumb = $$(workThumbsSelector).first()
      thumb.click()
      expect(thumb.getAttribute('href')).toBe(browser.getCurrentUrl())

    it 'should have hidden work detail section before load', ->
      detail = $$('.work-detail').first()
      expect(detail.isDisplayed()).toBe false

    it "should load project when clicking first project thumb by verifying visibility and project titles match", ->
      first = $$(workThumbsSelector).first()
      first.click()
      expect($('.work-detail').isDisplayed()).toBe true
      expect($('.detail-title ').isDisplayed()).toBe true
      expect(first.getText()).toEqual($('.detail-title').getText())

    it 'should load second project after first', ->
      #load first project
      $$(workThumbsSelector).first().click()
      title = $('.detail-title').getText()

      #load second project
      second = $$(workThumbsSelector).get(1)
      second.click()
      title2 = second.getText()
      expect(title2).toEqual($('.detail-title').getText())
      expect(title).not.toBe(title2)

    unless app.isSafariBrowser # safari has navigate issues and scrollspy issues
      it "should unload project when using back button", ->
        $$(workThumbsSelector).first().click()
        browser.sleep app.ANCHOR_SCROLL_DURATION
        browser.navigate().back() # back breaks in safari
        browser.sleep app.ANCHOR_SCROLL_DURATION
        expect(browser.getCurrentUrl()).toBe(app.getUrl(app.URL_HASH.WORK))
        expect($('.work-detail').isDisplayed()).toBe false

