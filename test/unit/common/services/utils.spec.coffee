describe 'Unit: Testing services.utils', ->
  $scope = utils = $timeout = $location = 0
  jQuery.fx.off = true
  beforeEach(module('services.utils'))
  beforeEach(inject ($injector) ->
    $scope = $injector.get('$rootScope')
    utils = $injector.get('utils')
    $timeout = $injector.get("$timeout")
    $location = $injector.get("$location")
  )

  #===========================================================
  # assignBtnHover
  #===========================================================
  describe 'assignBtnHover', ->
    testHover = (fixture, item, target) ->
      spyEventMouseEnter = spyOnEvent(target, 'mouseenter')
      spyEventMouseLeave = spyOnEvent(target, 'mouseleave')
      utils.assignBtnHover(fixture)
      item.trigger('mouseenter')
      attr = item.attr("data-hover")
      expect(target).toHaveClass(attr)
      target.trigger('mouseleave')
      expect(target).not.toHaveClass(attr)
      #expect(true).toBe(false)

    it 'should attached add/remove classes on hover', ->
      fixture = setFixtures("<span class='js-hover' data-hover='pulse'></span>")
      target = fixture.find(".js-hover")
      testHover(fixture, target, target)

    it 'should attached add/remove classes on hover - for an inner target', ->
      fixture = setFixtures("<span class='js-hover' data-hover='pulse'><span class='js-hover-target'></span></span>")
      item = fixture.find(".js-hover")
      target = fixture.find(".js-hover-target")
      testHover(fixture, item, target)



  #=============================================================
  # Window Scrolling
  #=============================================================

  # skip phantom since can't access WebPage.scrollPosiiton
  if !isPhantomBrowser
    describe 'Window Scrolling', ->
      scrollWaitTime = 0
      #
      # getScrollTop - cross browser
      #
      if !isMobileBrowser
        describe 'getScrollTop', ->
          fixture = 0
          beforeEach ->
            fixture = setFixtures(sandbox({style: 'height:10000px;background-color:blue;'}))
          it 'should get accruate scrollTop value', ->
            window.scrollTo(0, 50)

            waits(500)
            runs ->
              top = utils.getScrollTop()
              expect(top > 40 && top < 60).toBe(true)


      describe 'scrollAnimateTo Suite', ->

        #=============================================================
        # scrollAnimateTo
        #=============================================================

        describe 'scrollAnimateTo', ->
          fixture = page = scrollY = 0


          beforeEach ->
            window.scrollTo(0, 0)
            fixture = setFixtures(sandbox({style: 'height:10000px;background-color:blue;'}))
            #console.log "page.height:" + page.height() + " utils.getScrollTop():" + utils.getScrollTop()
            fixture.append('<span style=\'padding-top:500px;\' id=\'anchor\'>anchor</span>')
            scrollY = utils.getScrollTop()

          if !isMobileBrowser
            it 'should change page scroll based on numeric value', ->
              utils.scrollAnimateTo(100, 0)
              $timeout.flush()
              debugger
              waits(scrollWaitTime)
              runs ->

                #console.log '100 spec: scrollTop:' + utils.getScrollTop()  + ' window/height():' + $(window).height() + ' scrollY:' + scrollY
                #console.log('10000 spec: scrollTop:' + utils.getScrollTop()  + ' window/height():' + $(window).height())
                expect(utils.getScrollTop() > scrollY).toBe(true)

            it 'should change page scroll based on anchor', ->
              #debugger
              utils.scrollAnimateTo('#anchor', 0)
              $timeout.flush()
              waits(scrollWaitTime)
              runs ->
                expect(utils.getScrollTop() > scrollY).toBe(true)

          it 'should dispatch complete event', ->
            spyEvent = spyOnEvent(document, utils.EVENT_SCROLL_ANIMATE_COMPLETE)
            utils.scrollAnimateTo('#anchor', 0)
            $timeout.flush()
            waits(scrollWaitTime)
            runs ->
              expect(spyEvent).toHaveBeenTriggered()

        #=============================================================
        # assignScrollAnimateToAnchors
        #=============================================================
        ###
        describe 'assignScrollAnimateToAnchors', ->
          fixture = 0
          beforeEach ->
            fixture = setFixtures(sandbox({style: 'height:100000px;'}))
            fixture.append('<a href=\'#anchor\' class=\'js-scroll\'></a><br/><span style=\'padding-top:500px\' id=\'anchor\'>anchor</span>')

          it 'should animate to hash on links with \'js-scroll\' class', ->
            $item = fixture.find('.js-scroll')
            spyEventClick = spyOnEvent($item, 'click')
            spyEventScrolled = spyOnEvent(document, utils.EVENT_SCROLL_ANIMATE_COMPLETE)
            utils.assignScrollAnimateToAnchors('.js-scroll', 0)
            $item.trigger("click")
            $timeout.flush()
            waits(scrollWaitTime)
            runs ->
              expect(spyEventClick).toHaveBeenPrevented()
              expect(spyEventScrolled).toHaveBeenTriggered()

        ###


  #=============================================================
  # changePath
  #=============================================================
  ###
  describe 'changePath', ->
    it 'should change the URL path', ->
      utils.changePath("/test")
      expect($location.path() == '/test').toBe(true)
  ###

  #=============================================================
  # htmlHasClass
  #=============================================================
  describe 'htmlHasClass', ->
    it 'should read class off \'html\' element', ->
      $('html').addClass("__test")
      expect(utils.htmlHasClass("__test")).toBe(true)


