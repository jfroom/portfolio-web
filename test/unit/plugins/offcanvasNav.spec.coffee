describe 'Unit: Testing OffcanvasNav', ->

  it 'should be loaded', ->
    expect(OffcanvasNav).toBeDefined()


  describe 'basic functions', ->
    offcanvasNav = $slideTarget = $btnToggle = $cover = $offcanvasNav = settings = 0

    beforeEach ->
      jQuery.fx.off = true

      #$body = $('html body')
      #$body.attr("data-offcanvas-nav", "test")
      #$body.attr("data-offcanvas-nav-xMax", "150")

      setFixtures(window.__html__['test/fixtures/html/offcanvasNav.spec.html'])

      jasmine.getJSONFixtures().fixturesPath = testDataPath
      #jasmine.getFixtures().fixturesPath = testDataPath
      settings = getJSONFixture('offcanvasNavSettings.spec.json')

      offcanvasNav = new OffcanvasNav(settings)
      $offcanvasNav = $(settings.offcanvasNavSelector)
      $btnToggle = $(settings.toggleBtnSelector)
      $slideTarget = $(settings.slideTargetSelector)
      $cover = $(settings.coverSelector)

    it 'should initialize', ->
      expect(offcanvasNav).toBeDefined()


    #it 'should initialize off body data attributes', ->
      #todo: add test for instaciation off body data attributes
      #window.offcanvasNav = undefined
     #expect(window.offcanvasNav).toBeDefined()


    it 'should have a toggle button, slide targets, and a cover', ->
      expect($btnToggle.length > 0).toBe(true)
      expect($slideTarget.length > 0).toBe(true)
      expect($cover.length > 0).toBe(true)

    it 'should slide open when calling .open()', ->
      isComplete = false
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE, ->
        #console.log "OPEN"
        isComplete = true

      offcanvasNav.open()
      waitsFor ->
        isComplete
      , "open to complete transitioning", 5000
      runs ->
        expect(isComplete).toBe(true)
        expect(offcanvasNav.getIsOpen()).toBe(true)


    it 'should slide closed when calling .close()', ->
      isComplete = false
      offcanvasNav.open()
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE, ->
        #console.log "OPEN"
        isComplete = true
      waitsFor ->
        isComplete
      , "close to complete transitioning", 100

      offcanvasNav.close()
      runs ->
        expect(isComplete).toBe(true)
        expect(offcanvasNav.getIsOpen()).toBe(false)

    it 'should slide open when clicking toggle button (when closed)', ->
      isComplete = false
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE, ->
        isComplete = true
      waitsFor ->
        isComplete
      , "open to complete transitioning", 100
      $btnToggle.trigger('click')
      runs ->
        expect(isComplete).toBe(true)

    ### this is now disabled, there's a div that covers this button to catch close clicks
    it 'should slide closed when clicking toggle button (when open)', ->
      isComplete = false
      offcanvasNav.open()
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE, ->
        isComplete = true
      waitsFor ->
        isComplete
      , "close to complete transitioning", 100

      $btnToggle.trigger('click')
      runs ->
        expect(isComplete).toBe(true)
    ###

    it 'should slide closed when clicking content cover (when open)', ->
      isComplete = false
      offcanvasNav.open()
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE, ->
        #console.log("CLOSE")
        isComplete = true
      waitsFor ->
        isComplete
      , "close to complete transitioning", 1000
      $cover.click();
      runs ->
        expect(isComplete).toBe(true)

    it 'should slide closed when clicking inner link in nav (when open)', ->
      isComplete = false
      offcanvasNav.open()
      runs ->
        offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE, ->
          #console.log("CLOSE")
          isComplete = true
        waitsFor ->
          isComplete
        , "close to complete transitioning", 1000

        $links = $offcanvasNav.find("a")
        $links.eq(0).click()

        runs ->

          expect(isComplete).toBe(true)

    it 'should reflect state via getIsOpen', ->
      offcanvasNav.open()
      expect(offcanvasNav.getIsOpen()).toBe(true)
      offcanvasNav.close()
      expect(offcanvasNav.getIsOpen()).toBe(false)

    it 'should close when orientation changes', ->
      offcanvasNav.open()
      $(window).trigger('orientationchange')
      expect(offcanvasNav.getIsOpen()).toBe(false)


    it 'cover should be draggable', ->
      offcanvasNav.open()
      x = $cover.offset().left
      MouseBot.simulateMouseEvent 'touchstart', $cover.offset().left, $cover.offset().top
      MouseBot.simulateMouseEvent 'touchmove', $cover.offset().left - 10, $cover.offset().top
      x -= 10
      expect(x == $cover.offset().left).toBe(true)

    it 'cover should be draggable, and stay open if dragged to right and released', ->
      offcanvasNav.open()
      MouseBot.simulateMouseEvent 'touchstart', $cover.offset().left, $cover.offset().top
      MouseBot.simulateMouseEvent 'touchmove', $cover.offset().left + 10, $cover.offset().top
      MouseBot.simulateMouseEvent 'touchend', $cover.offset().left, $cover.offset().top
      expect(offcanvasNav.getIsOpen()).toBe(true)

    it 'cover should be draggable, and stay open if dragged to left < 25%', ->
      offcanvasNav.open()
      MouseBot.simulateMouseEvent 'touchstart', $cover.offset().left, $cover.offset().top
      MouseBot.simulateMouseEvent 'touchmove', $cover.offset().left - 10, $cover.offset().top
      MouseBot.simulateMouseEvent 'touchend', $cover.offset().left, $cover.offset().top
      expect(offcanvasNav.getIsOpen()).toBe(true)

    it 'cover should be draggable, and close if dragged to left > 25%', ->
      offcanvasNav.open()
      MouseBot.simulateMouseEvent 'touchstart', $cover.offset().left, $cover.offset().top
      MouseBot.simulateMouseEvent 'touchmove', $cover.offset().left - (settings.xMax-10), $cover.offset().top
      MouseBot.simulateMouseEvent 'touchend', $cover.offset().left, $cover.offset().top
      expect(offcanvasNav.getIsOpen()).toBe(false)

    it 'should close when window gets smaller than breakpoint', ->
      offcanvasNav.open()
      expect(offcanvasNav.getIsOpen()).toBe(true)
      offcanvasNav.setWidthBreakPoint(50)
      expect(offcanvasNav.getWidthBreakPoint()).toBe(50)
      expect(offcanvasNav.getIsOpen()).toBe(false)

