describe "E2E: Testing Work Nav", ->

  workData = []

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
        #nothing
      global.specUtils.getAppDataAsync (data) ->
        workData = __.clone(data.work.projects)
        hasData = true
      firstRun = false

  describe 'nav buttons', ->

    testNextBackBtns = (btnGroupSelector) ->
      firstUrl = '/#!/work/' + workData[0].id
      backUrl = '/#!/work/' + workData[workData.length - 1].id
      nextUrl = '/#!/work/' + workData[1].id

      browser.get firstUrl
      webPage.pause global.specUtils.anchorScrollDuration

      webPage.find.csss(btnGroupSelector).then (arr) ->
        btnBack = arr[0]
        btnNext = arr[1]

        #btm has up button in middle position
        if (arr.length == 3)
          btnNext = arr[2]

        btnBack.click()
        webPage.pause global.specUtils.anchorScrollDuration
        webPage.url().then (url) ->
          #log 'after back url: ' + url
          expect(url.indexOf(backUrl) > -1).toEqual(true)
        btnNext.click()
        webPage.pause global.specUtils.anchorScrollDuration
        btnNext.click()
        webPage.pause global.specUtils.anchorScrollDuration
        webPage.url().then (url) ->
          #log 'after next next url: ' + url
          expect(url.indexOf(nextUrl) > -1).toEqual(true)

    it 'should be functional next/back project navigation buttons: top buttons', ->
      testNextBackBtns '.work-nav .btn-group a'
    it 'should be functional next/back project navigation buttons: btm buttons', ->
      testNextBackBtns '.work-nav-btm .btn-group a'
    if !global.specUtils.isPhantomBrowser
      it 'should have functional top button in bottom navigation row', ->
        #scroll to top
        browser.executeScript('$("html,body").scrollTop(0);').then () ->
          #done
        btnTop = {}
        webPage.find.csss('.work-nav-btm .btn-group a').then (arr) ->
          btnTop = arr[1]


          oldScrollY = -1
          browser.executeScript(global.specUtils.utilsJS + ";return window.testUtils.getScrollTop();").then (result) ->
            oldScrollY = result
          #log 'oldScrollY:' + oldScrollY
          btnTop.click()
          webPage.pause global.specUtils.anchorScrollDuration
          browser.executeScript(global.specUtils.utilsJS + ";return window.testUtils.getScrollTop();").then (result) ->
            curScrollY = result
            #log 'curScrollY:' + curScrollY
            expect(curScrollY != oldScrollY).toBe(true)

