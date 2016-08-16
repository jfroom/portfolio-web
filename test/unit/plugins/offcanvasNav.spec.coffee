describe 'Unit: Testing OffcanvasNav', ->

  it 'should be loaded', ->
    expect(OffcanvasNav).toBeDefined()


  describe 'basic functions', ->
    offcanvasNav = $slideTarget = $btnToggle = $cover = $offcanvasNav = settings = 0

    beforeEach ->
      jQuery.fx.off = true
      setFixtures(window.__html__['test/fixtures/html/offcanvasNav.spec.html'])

      jasmine.getJSONFixtures().fixturesPath = testDataPath
      settings = getJSONFixture('offcanvasNavSettings.spec.json')

      offcanvasNav = new OffcanvasNav(settings)
      $offcanvasNav = $(settings.offcanvasNavSelector)
      $btnToggle = $(settings.toggleBtnSelector)
      $slideTarget = $(settings.slideTargetSelector)
      $cover = $(settings.coverSelector)

    it 'should initialize', ->
      expect(offcanvasNav).toBeDefined()

    it 'should have a toggle button, slide targets, and a cover', ->
      expect($btnToggle.length > 0).toBe(true)
      expect($slideTarget.length > 0).toBe(true)
      expect($cover.length > 0).toBe(true)

    it 'should slide open when calling .open()', (done) ->
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE, ->
        expect(offcanvasNav.getIsOpen()).toBe(true)
        done()
      offcanvasNav.open()

    it 'should slide closed when calling .close()', (done) ->
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE, ->
        offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE, ->
          expect(offcanvasNav.getIsOpen()).toBe(false)
          done()
        offcanvasNav.close()
      offcanvasNav.open()

    it 'should slide open when clicking toggle button (when closed)', (done) ->
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE, ->
        expect(offcanvasNav.getIsOpen()).toBe(true)
        done()
      $btnToggle.trigger('click')

    it 'should slide closed when clicking content cover (when open)', (done) ->
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE, ->
        setTimeout (-> $cover.click()), 0 # give DOM a cycle to register changes
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE, ->
        expect(offcanvasNav.getIsOpen()).toBe(false)
        done()
      offcanvasNav.open()

    it 'should slide closed when clicking inner link in nav (when open)', (done) ->
      offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE, ->
        offcanvasNav.bind offcanvasNav.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE, ->
          expect(offcanvasNav.getIsOpen()).toBe(false)
          done()
        $links = $offcanvasNav.find("a")
        $links.eq(0).click()
      offcanvasNav.open()

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

