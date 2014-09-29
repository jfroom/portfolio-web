describe "E2E: Testing Work Projects", ->

  # projects that go thru each variation of optional/required
  testWorkIds = ['body-of-work', 'elicit-client', 'harley-finder']


  workData = []
  workDataOriginal = []

  # load run time JSON data from page, tricky async
  firstRun = true
  beforeEach ->

    if firstRun
      hasData = false
      #webPage.setWindowMax()
      browser.get global.specUtils.workUrl
      webPage.pause global.specUtils.anchorScrollDuration
      waitsFor ->
        hasData
      runs ->
        registerDynamicAssertions()
      global.specUtils.getAppDataAsync (data) ->
        workDataOriginal = __.clone(data.work)
        workData = __.clone(workDataOriginal)
        #filter down to only test ids
        workData = __.filter workData, (item) ->
          arr = __.filter testWorkIds, (id) ->
            item.id == id
          return arr.length > 0
        hasData = true
      firstRun = false



  # validate workData, this block also holds jasmine open for dymamic insertion
  describe 'assign project data', ->

    it 'should have appData', ->
      expect(workData != undefined).toBe(true)

  registerDynamicAssertions = ->
    # log 'registerDynamicAssertions'
    testProject = (project, done) ->

      browser.get global.specUtils.workUrl + '/' + project.id
      webPage.pause 0
      # log 'testProject ' + project.ids
      describe 'Work Projects', ->
        # BROWSER URL (required)
        it 'should load have url with id in it', ->
          webPage.url().then (url)->
            expect(url.indexOf(global.specUtils.workUrl + '/' + project.id) > -1).toBe(true)

        # TITLE (required)
        it 'should have title set', ->
          expect(webPage.find.binding('workCur.title').getText()).toEqual(project.title)

        # MEDIA (required)
        it 'should have media', ->
          browser.$$('.detail-media .item-media').then (arr) ->
            # each item should have at least one media element
            i = 0
            expect(arr.length > 0).toBe(true)
            expect(project.detailMedia.length > 0).toBe(true)

            __.forEach arr, (item) ->
              dataItem = project.detailMedia[i]
              i += 1
              #log 'dataItem.type:' + dataItem.type + " src:" + dataItem.src
              switch dataItem.type
                when 'image'
                  item.findElement(protractor.By.css('img')).then (el) ->
                    #log 'found el:' + el + ' is object?'
                    expect(__.isObject(el)).toBe(true)
                    el.getAttribute('src').then (src) ->
                      expect(src.indexOf(dataItem.src) > -1).toBe(true)
                when 'youtube'
                  item.findElement(protractor.By.css('iframe')).then (el) ->
                    expect(__.isObject(el)).toBe(true)
                    el.getAttribute('src').then (src) ->
                      expect(src.indexOf(dataItem.id) > -1).toBe(true)
                else
                  #nothing

        # DESCRIPTION (required)
        it 'should have description set', ->
          browser.$('.work-detail .description').getText().then (str) ->
          #webPage.find.binding('workCur.descProcessed').getText().then (str) ->

            expect(__.isString(str)).toBe(true)
            expect(str.length > 0).toBe(true)

        # PRESS (optional)
        if __.isArray(project.pressArr) and project.pressArr.length > 0
          it 'should have press links', ->
            browser.findElements(protractor.By.repeater('item in workCur.pressArr')).then (arr) ->
              el = arr[0]
              expect(el.isDisplayed()).toBe(true)
              el.getText().then (str) ->
                expect(str.indexOf(project.pressArr[0].source) > -1).toBe(true)
        else
          it 'should not have press section', ->
            expect(browser.$('.work-detail .press').isDisplayed()).toBe(false)

        # TECH (required)
        if __.isArray(project.techArr) and project.techArr.length > 0
          it 'should have technology logos', ->
            browser.findElements(protractor.By.repeater('item in workCur.techProcessedArr')).then (arr) ->
              el = arr[0]
              expect(el.isDisplayed()).toBe(true)
              el.getAttribute('href').then (href) ->
                expect(href.length > 0).toBe(true)

        # TEAM (optional)
        if __.isArray(project.teamArr) and project.teamArr.length > 0
          it 'should have team members', ->
            browser.findElements(protractor.By.repeater('item in workCur.teamProcessedArr')).then (arr) ->
              el = arr[0]
              expect(el.isDisplayed()).toBe(true)
        else
          it 'should not have team section', ->
            expect(browser.$('.work-detail .team').isDisplayed()).toBe(false)

        it 'should kick off next project', ->
          done()

    kickOffProjects = ->
      log 'kickOffProjects'

      curProject = -1
      testProjectNext = ->

        curProject += 1
        #log 'testProjectNext ' + curProject
        if (curProject < workData.length)
          testProject(workData[curProject], testProjectNext)
      testProjectNext()
    kickOffProjects()
