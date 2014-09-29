angular.module("services.utils", ["services.log"])
.factory 'utils', [ "$timeout", "$rootScope", "$location", "log", ($timeout, $rootScope, $location, $log) ->
  isDebug = false
  log = (s) ->
    if isDebug
      $log.info s
      #console.log s
  self =

    # =============================================
    # assignBtnHover
    # =============================================
    assignBtnHover: (_scope = $ document) ->
      _scope.find('.js-hover').each( (index, value) ->
        $item = $(value)
        $animateItem = $item
        if $item.find(".js-hover-target").length > 0
          $animateItem = $item.find(".js-hover-target").eq(0)
        $item.hover(
          ->
            $animateItem.addClass($(value).attr "data-hover")
          ->
            $animateItem.removeClass($(value).attr "data-hover")
        )
      )

    # =============================================
    # scrollAnimateTo
    # =============================================
    _lastScrollAnimateTo: -1
    _scrollAnimateTo_promise:null
    EVENT_SCROLL_ANIMATE_COMPLETE: "scrollAnimateTo-complete"
    scrollAnimateTo: (val, duration = 500, delay = 0, easing = "swing", complete = ->
      $(document).trigger(self.EVENT_SCROLL_ANIMATE_COMPLETE)
    ) ->
      log "scrollAnimateTo " + val + " duration:" + duration + " delay:" + delay

      fn = ->
        type = $.type val
        offset = val
        if type == "string"
          offset = $(val).offset()?.top
          log 'offset 1:' + offset
          offset -= parseInt($('html').css("padding-top"), 10)

        if _lastScrollAnimateTo != offset
          log "scrollTo " + offset + " delay: " + delay + " duration:" + duration
          scrollAnimateToCompleted = false
          target = $('body, html')
          if self.isMobileBrowser()
            target = $('body')

          fnComplete = ->
            #complete may call 2x b/c of body,html
            if !scrollAnimateToCompleted
              log 'complete body height:' + $('body').height() + ' self.getScrollTop():' + self.getScrollTop()
              scrollAnimateToCompleted = true
              complete()
            target.clearQueue()

          if (duration == 0)
            target.scrollTop(offset)
            fnComplete()
          else
            target.stop().delay(delay).animate { scrollTop: offset }, duration, easing, fnComplete

          #phantom is testing only, but it can't scroll - must use scrollPosition
          #if self.isPhantomBrowser()
          #  console.log("phantom!")
          _lastScrollAnimateTo = offset
      if self._scrollAnimateTo_promise
        $timeout.cancel self._scrollAnimateTo_promise
      self._scrollAnimateTo_promise = $timeout fn, 1
      #return $('body, html')


    htmlHasClass: (c) ->
      $("html").hasClass(c)
    isPhantomBrowser: ->
      phantom = /phantom/i.test(navigator.userAgent)
    isMobileBrowser: ->
      isMobile = /(iPod|iPhone|iPad|Android)/i.test(navigator.userAgent)


    #
    # getScrollTop - cross browser
    # http://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
    getScrollTop: ->
      #console.log 'pageYOffset:' + pageYOffset + " window.pageYoffset:" + window.pageYOffset + " self.isMobileBrowser:" + self.isMobileBrowser()
      unless typeof pageYOffset is "undefined" || self.isMobileBrowser()
        #most browsers except IE before #9
        pageYOffset
      else
        B = document.body #IE 'quirks'
        D = document.documentElement #IE with doctype
        D = (if (D.clientHeight) then D else B)
        D.scrollTop
]
