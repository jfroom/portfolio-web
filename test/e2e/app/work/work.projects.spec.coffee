app = new (require('../../pageObjects/appPage.coffee'))()
__ = require('lodash')

# projects that go thru each variation of optional/required
testWorkIds = ['test-1', 'test-2', 'test-3']
workData = []
workDataOriginal = []

describe "E2E: Testing Work Projects", ->

  # load page and grab static copy of work data. only need to do this once
  beforeAll (done) ->
    app.get ->
      app.getAppDataAsync (data) ->
        workDataOriginal = data.work.projects
        workData = __.clone workDataOriginal
        workData = __.filter workData, (item) ->
          item.id in testWorkIds
        done()
    , app.URL_HASH.WORK

  it 'should have appData', ->
    expect(workData).toBeDefined()

  for id in testWorkIds
    project = {}
    describe "Work Project: #{id}", ->
      beforeAll ->
        project = __.find workData, (project) -> project.id is id
      beforeEach (done) ->
        app.get done, "#{app.URL_HASH.WORK}/#{project.id}"

      # BROWSER URL (required)
      it 'should have required: url, title, description', (done) ->
        browser.getCurrentUrl().then (url) ->
          expect(url).toEqual(app.getUrl "#{app.URL_HASH.WORK}/#{project.id}")

        # TITLE (required)
        expect(element(By.binding('workCur.title')).getText()).toEqual(project.title)

        # DESCRIPTION (required)
        $('.work-detail .description').getText().then (str) ->
          expect(__.isString(str)).toBe(true)
          expect(str.length).toBeGreaterThan(0)
          done()

      # MEDIA (required)
      it 'should have media', (done) ->
        $$('.detail-media .item-media').then (arr) ->
          # each item should have at least one media element
          expect(arr.length).toBeGreaterThan(0)
          expect(project.detailMedia.length).toBeGreaterThan(0)

          doneIdx = 0
          checkDone = ->
            doneIdx++
            done() if doneIdx is arr.length

          for item, idx in arr
            dataItem = project.detailMedia[idx]
            switch dataItem.type
              when 'image'
                item.$('img').getAttribute('src').then (src) ->
                  expect(src).toMatch(new RegExp(dataItem.src))
                  checkDone()
              when 'youtube'
                item.$('iframe').getAttribute('src').then (src) ->
                  expect(src).toMatch(new RegExp(dataItem.id))
                  checkDone()
              when 'video'
                item.$('video').getAttribute('poster').then (poster) ->
                  expect(poster).toMatch(RegExp(dataItem.poster))
                  item.$('video').getAttribute('src').then (src) ->
                    expect(src).toMatch(RegExp(dataItem.mp4))
                    checkDone()

      it 'should optionally have: description, press, team', (done) ->
        doneIdx = 0
        checkDone = ->
          doneIdx++
          done() if doneIdx += 1 is 3

        # PRESS (optional)
        if project.pressArr?.length
          $$('.work-detail .press li').first().getText().then (str) ->
            expect(str).toMatch(new RegExp(project.pressArr[0].source))
            checkDone()
        else
          expect($('.work-detail .press').isDisplayed()).toBe(false)
          checkDone()

        # TECH (required)
        if project.techArr?.length
          first = $$('.work-detail .tech-icons a').first()
          expect(first.isDisplayed()).toBe(true)
          first.getAttribute('href').then (href) ->
            expect(href.length).toBeGreaterThan(0)
            checkDone()
        else checkDone()

        # TEAM (optional)
        if project.teamArr?.length
          expect($$('.work-detail .team .list li').first().isDisplayed()).toBe(true)
        else
          expect($('.work-detail .team').isDisplayed()).toBe(false)
        checkDone()
