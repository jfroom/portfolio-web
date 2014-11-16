((window, document, $) ->
  window.OffcanvasNav = (options) ->
    # Default settings
    settings =
      debug: false
      coverSelector: ".flyout-cover"
      slideTargetSelector: ".offcanvas-slide"
      toggleBtnSelector: ".navbar-toggle"
      offcanvasNavSelector: "header.flyout"
      coverActiveClass: "active"
      widthBreakPoint: 768
      xMax: 150
      xMin: 0
      xMoveThresholdForClick:10
      animationDuration: 400
      closeWhenInnerLinksClicked: true

    # Merge default settings with options.
    settings = $.extend settings, options

    startTime = new Date()

    # Simple logger.
    log = (msg) ->
      endTime = new Date()
      timeDiff = endTime - startTime
      console?.log "[offcanvas " + timeDiff + "] " + msg if settings.debug
    self =
      {
        touchStartX: 0
        isTouchDown: false
        xCur:0
        $cover: null
        $toggleBtn: null
        $slideTargets: null
        isOpen: false
        hasDragged: false
        xCoverDragStart:0
        offcanvasDelay_id:0
        EVENT_OFFCANVASNAV_CLOSE: "offcanvasnav-close"
        EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE: "offcanvasnav-transition-close-complete"
        EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE: "offcanvasnav-transition-open-complete"
        CLASS_OFFCANVAS_READY: "offcanvasnav-ready"
        init: ->
          _ = this
          _.startup()
        startup: ->
          _ = this
          _.$cover = $(settings.coverSelector)
          _.$slideTargets = $(settings.slideTargetSelector)
          _.$offcanvasNav = $(settings.offcanvasNavSelector)
          _.$toggleBtn = $(settings.toggleBtnSelector)
          _.$toggleBtn.data("offcanvas_isToggleBtn", true)
          _.handleWindowResize()

          _.offcanvasActivate(false)
          _.bindToggleBtn true
          if settings.closeWhenInnerLinksClicked
            _.bindInnerLinkEvents true

          $("html").addClass _.CLASS_OFFCANVAS_READY

        close: () ->
          _ = this
          log 'close isOpen? _.isOpen:' + _.isOpen
          if (_.isOpen)
            _.coverOpenToggle(false)
            _.coverActivate(false)

        open: () ->
          _ = this
          log 'open isOpen? _.isOpen:' + _.isOpen
          if !_.isOpen
            _.coverOpenToggle(true)
            _.coverActivate(true)

        getIsOpen: ->
          this.isOpen

        destroy: ->
          _ = this
          _.close()
          _.bindToggleBtn false
          $("html").removeClass _.CLASS_OFFCANVAS_READY
          self = null
          publicAPI = null

        bindToggleBtn: (bol) ->
          _ = this
          _.$toggleBtn.unbind 'click', $.proxy(_.handleToggleBtnClick, _)
          if (bol)
            _.$toggleBtn.bind "click", $.proxy(_.handleToggleBtnClick, _)

        handleToggleBtnClick:(e) ->
          _ = this
          log("handleToggleBtnClick " + _.isOpen)
          _.toggleOffCanvasNav(!_.isOpen)

        #
        # PRIVATE
        #
        toggleOffCanvasNav: (bol) ->
          _ = this
          if _.isOpen && !bol
            _.close()
          else if !_.isOpen && bol
            _.open()

        offcanvasActivate: (bol) ->
          _ = this
          if (bol)
            _.$offcanvasNav.css({"visibility":"visible"})
          else
            _.$offcanvasNav.css({"visibility":"hidden"})
          _.bindToggleBtn !bol

        #
        # COVER
        #
        coverActivate: (bol) ->
          _ = this
          _.hasDragged = false

          if bol
            _.bindGeneralEvents(true)
            _.bindEvents(_.$cover, true)
            _.handleWindowResize()
            _.$cover.addClass(settings.coverActiveClass)

          else
            _.bindEvents(_.$cover, false)
            _.bindGeneralEvents(false)
            _.$cover.removeClass(settings.coverActiveClass)

        coverOpenToggle: (bol, aniTime = -1, delay = 0) ->

          log 'coverOpenToggle ' + bol
          _ = this

          targetX = if bol then settings.xMax else settings.xMin
          if aniTime == -1
            aniTime = settings.animationDuration
          _.isOpen = bol

          if bol

            _.xCur = _.xCoverDragStart = settings.xMax
            _.offcanvasActivate(true)
          else

            _.xCur = _.xCoverDragStart = settings.xMin

            clearTimeout(_.offcanvasDelay_id)
            _.offcanvasDelay_id = setTimeout () ->
              _.offcanvasActivate(false)
            , delay + aniTime + 50

            _.coverActivate(false)
          _.targetsTransition targetX, aniTime, delay

        coverDeltaX: (deltaX) ->
          _ = this
          newX = settings.xMax + deltaX
          if newX <  settings.xMin
            newX =  settings.xMin
          else if newX > settings.xMax
            newX = settings.xMax

          #log "coverDeltaX " + deltaX + " newX:"+ newX
          return newX

        coverPlaceDeltaX: (deltaX) ->
          _ = this
          hasChanged = false

          newX = _.xCoverDragStart + deltaX
          if newX <  settings.xMin
            newX =  settings.xMin
          else if newX > settings.xMax
            newX = settings.xMax

          #log "coverPlaceDeltaX " + deltaX + " newX:" + newX + " _.xCoverDragStart:" + _.xCoverDragStart
          val = "translate(" + newX + "px, 0)"
          hasChanged = _.xCur != newX
          _.xCur = newX
          _.targetsTransition(newX)

          per = newX / (settings.xMax - settings.xMin)
          #_.$cover.css("opacity", per)
          #log "coverPlaceDeltaX deltaX:" + deltaX + " per:" + per + " newX:" + newX + " _.xCur:"+ _.xCur +  "xCoverDragStart:" + _.xCoverDragStart
          return hasChanged

        targetsTransition: (x, time, delay) ->
          _ = this
          transition = transitionDelay = transform = ""
          if x != undefined
            transform = "translate(" + x + "px, 0)"
            if time != undefined
              transition = "transform " + time + "ms ease"

              if delay != undefined && delay > 0
                transitionDelay = delay + "ms"
            log "targetsTrans x:" + x + " time:" + time + "delay:" + delay + " transform:" + transform + " transitionDelay:" + transitionDelay + " transition:" + transition
            if !Modernizr.cssanimations
              ob = {
                "left" : targetX + "px"
              }
              _.$slideTargets.css(ob)
              _.handleTargetsTransitionEnd();

            else
              if delay > 0 && time == 0
                time = 1
              transitionEndEvents = 'transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd'
              _.$slideTargets.eq(0).unbind(transitionEndEvents,  $.proxy(_.handleTargetsTransitionEnd, _))
                .bind(transitionEndEvents, $.proxy(_.handleTargetsTransitionEnd, _))
              _.$slideTargets.css({
                "-webkit-transform": transform,
                "-ie-transform": transform,
                "transform": transform
                "-webkit-transition": "-webkit-" + transition
                "-ie-transition": "-webkit-" + transition
                "transition":  transition
                "-ie-transition-delay": transitionDelay
                "-webkit-transition-delay": transitionDelay
                "transition-delay": transitionDelay
              })
              if time == 0 && delay == 0
                _.handleTargetsTransitionEnd()


        handleTargetsTransitionEnd: (e) ->
          _ = this
          log '
handleTargetsTransitionEnd isOpen:' + _.isOpen + ' _.xCur:' + _.xCur

          if _.isOpen && _.xCur == settings.xMax
            log '"handleTargetsTransitionEnd EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE'
            $(_).trigger(_.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE)
          else if !_.isOpen && _.xCur == settings.xMin
            log '"handleTargetsTransitionEnd EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE'
            $(_).trigger(_.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE)

        # ===================================
        # EVENTS
        # ===================================
        bindGeneralEvents: (bol) ->
          _ = this
          $(window)
            .unbind('resize', $.proxy(_.handleWindowResize, _))
            .unbind('orientationchange', $.proxy(_.handleOrientationChange, _))
            .unbind('touchmove mousemove', $.proxy(_.handleCoverTouchMove, _))
            .unbind('touchend mouseup', $.proxy(_.handleCoverTouchUp, _));
          $(document).unbind('touchmove', $.proxy(_.handleEventPrevent, _))
          if bol
            $(window)
              .bind('resize', $.proxy(_.handleWindowResize, _))
              .bind('orientationchange', $.proxy(_.handleOrientationChange, _))
              .bind('touchmove mousemove', $.proxy(_.handleCoverTouchMove, _))
              .bind('touchend mouseup', $.proxy(_.handleCoverTouchUp, _))
            $(document).bind('touchmove', $.proxy(_.handleEventPrevent, _))

        bindEvents: ($target, bol) ->
          _ = this
          $target
            .unbind('touchstart mousedown', $.proxy(_.handleCoverTouchDown, _))
            .unbind('touchmove mousemove', $.proxy(_.handleCoverTouchMove, _))
            .unbind('touchend mouseup', $.proxy(_.handleCoverTouchUp, _))
            .unbind('click', $.proxy(_.handleCoverTouchUp, _))

          if bol
            $target
              .bind('touchstart mousedown', $.proxy(_.handleCoverTouchDown, _))
              .bind('touchcancel', $.proxy(_.handleCoverTouchCancel, _))
              .bind('touchend mouseup', $.proxy(_.handleCoverTouchUp, _))
              .bind('click', $.proxy(_.handleCoverTouchUp, _))

        bindInnerLinkEvents: (bol) ->
          _ = this
          $links = _.$offcanvasNav.find('a')
          $links.unbind 'click tap', $.proxy(_.handleInnerLinkClick, _)
          if bol
            $links.bind 'click tap', $.proxy(_.handleInnerLinkClick, _)

        handleCoverClick: (e) ->
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          log 'click'

        handleCoverTouchDown: (e) ->
          _ = this
          #log "touchstart isOpen:" + _.isOpen
          e.preventDefault()
          _.hasDragged = false
          _.isTouchDown = true
          _.touchStartX = _.getTouchX(e)
          _.touchLastX = _.touchStartX

          if !_.isOpen
            _.coverActivate(true)
            _.handleCoverTouchMove(e)

          log "touch start " + _.touchStartX + " toggleBtn? " + $(e.target).data("offcanvas_isToggleBtn")

        handleCoverTouchMove: (e) ->
          _ = this
          e.preventDefault()
          if (_.isTouchDown)

            touchX = _.getTouchX(e)
            _.touchLastX = touchX
            deltaX = touchX - _.touchStartX
            deltaX2 = deltaX
            #log "flyout touch move deltaX: " + deltaX + " _.xCur:" + _.xCur + " deltaX2:" + deltaX2 + " touchX:" + touchX + " _.touchStartX:" + _.touchStartX
            _.hasDragged = _.coverPlaceDeltaX(deltaX)


        handleCoverTouchUp: (e) ->
          _ = this
          log "!!cover touch end _.isTouchDown:" + _.isTouchDown + " _.xCoverDragStart:" + _.xCoverDragStart + " isOpen:" + _.isOpen + " hasDragged:" + _.hasDragged + " xcur:" + _.xCur + " e.type:" + e.type
          if e.type == 'click'
            _.isTouchDown = true
            _.touchStartX = _.touchLastX = _.getTouchX(e)
          if _.isTouchDown
            _.isTouchDown = false
            touchX = _.touchLastX
            touchDeltaX = Math.abs(touchX - _.touchStartX)
            #_.$slideTargets.removeClass("drag")
            log "touchDeltaX:" + touchDeltaX + " _touchStartX:" + _.touchStartX + " touchX:" + touchX

            # trying to close from full open state
            if _.xCur >= settings.xMax
              if touchDeltaX < settings.xMoveThresholdForClick || isNaN(touchDeltaX)
                log 'handleCoverTouchUp going for closed from full open'
                _.coverOpenToggle(false)
            else
              midX = .75 * (settings.xMax + settings.xMin)
              bolDoClose = _.xCur <= midX # && _.xCoverDragStart > settings.xMin
              log "midX:" + midX + " xCur:" + _.xCur + "touchDeltaX:" + touchDeltaX + " xMax" + settings.xMax + " bolDoOpen:" + " bolDoClose:" + bolDoClose + " isOpen:" + _.isOpen + " _.xCoverDragStart:" + _.xCoverDragStart

              if bolDoClose
                log 'handleCoverTouchUp going for closed'
                _.coverOpenToggle(false)
              else
                log 'handleCoverTouchUpgoing for open'
                _.coverOpenToggle(true)

        handleCoverTouchCancel: () ->
          _ = this
          log "handleCoverTouchCancel"
          _.isTouchDown = false

        handleEventPrevent: (e) ->
          e.preventDefault()

        handleOrientationChange: (e) ->
          _ = this
          _.close()

        handleWindowResize: ->
          _ = this
          $doc = $(document)
          _.$cover.width($doc.width()).height($doc.height())
          $('header.flyout .nav').height($doc.height()+100)
          log 'handleWindowResize _.isOpen:' + _.isOpen + " doc.width:" + $doc.width() + " breakpoint:" + settings.widthBreakPoint
          if _.isOpen
            if $doc.width() >= settings.widthBreakPoint
              log 'handleWindowResize gong for closed'
              _.coverOpenToggle false



        setWidthBreakPoint: (w) ->
          _ = this
          settings.widthBreakPoint = w
          _.handleWindowResize()

        getWidthBreakPoint: () ->
          settings.widthBreakPoint

        bindAPIEvent: (eventType, cb) ->
          _ = this
          $(_).bind(eventType, cb)
        unbindAPIEvent: (eventType, cb) ->
          _ = this
          $(_).unbind(eventType, cb)
        handleInnerLinkClick: (e) ->
          _ = this
          _.close()
        #

        #=================================================================================
        # UTIL
        #=================================================================================
        getTouchX: (e) ->
          #log "getTouchX e.originalEvent" + e.originalEvent
          ee = e
          if (e.originalEvent)
            ee = e.originalEvent
          #log "getTouchX e.pageX" + e.pageX
          x = ee.pageX
          if (Modernizr.touch)
            try
              x = ee.touches[0].pageX
            catch err
              x = ee.pageX
          return x
      }
    self.init()

    publicAPI = {
      settings: self.settings
      open: $.proxy(self.open, self)
      close: $.proxy(self.close, self)
      destroy: $.proxy(self.destroy, self)
      getIsOpen: $.proxy(self.getIsOpen, self)
      setWidthBreakPoint: $.proxy(self.setWidthBreakPoint, self)
      getWidthBreakPoint: $.proxy(self.getWidthBreakPoint, self)
      bind: $.proxy(self.bindAPIEvent, self)
      unbind: $.proxy(self.unbindAPIEvent, self)
      EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE: self.EVENT_OFFCANVASNAV_TRANSITION_CLOSE_COMPLETE
      EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE: self.EVENT_OFFCANVASNAV_TRANSITION_OPEN_COMPLETE

    }
    return publicAPI

  $body = $("html body")
  if $body.attr("data-offcanvas-nav") != undefined
    opts = {}
    if $body.attr("data-offcanvas-nav-xMax") != undefined
      opts.xMax = parseInt($body.attr("data-offcanvas-nav-xMax"), 10)
    window.offcanvasNav = new window.OffcanvasNav opts

)(window, document, $)
