angular.module("services.navigation", ["services.utils"]).service "navigation", ["$rootScope", "utils", "log", "enums", "$location", "$timeout", ($rootScope, utils, $log, enums, $location, $timeout) ->

  startup = ->
    initScrollSpy()
    initActivePersist()
    initOffcanvasNav()

  initScrollSpy = ->
    $body = $('body')
    navSelector = '.navbar-top a'
    $body.scrollspy({navSelector:navSelector})
    $spyPromise = null
    $routeChangePromise = null

    $(window).resize ->
      $body.scrollspy 'refresh'

    $rootScope.$on '$routeChangeSuccess', ($currentRoute, $previousRoute) ->
      #$log.info 'bootstrap refresh on change successs'
      $timeout.cancel $routeChangePromise
      $routeChangePromise = $timeout( () ->
        $body.scrollspy 'refresh'
      , 500)

    $body.on 'activate', () ->
      $timeout.cancel $spyPromise
      $spyPromise = $timeout( () ->
        #$log.info 'bootstrap activated a new section'
        section = $body.find('.navbar-top li.active').find("a").attr("href")
        $log.info '-> active section:' + section
        if (section != undefined && section.indexOf("#") == 0)
          section = section.split('#')[1]
        path = "/" + section
        # suppress /work sending when location is /work/project

        isPathPartOfLocation = $location.path().indexOf(path) == 0
        $log.info 'isPathPartOfLocation:' + isPathPartOfLocation
        if !isPathPartOfLocation
          $rootScope.$broadcast enums.EventType.TrackPageview, path
        #$log.info 'active section:' + path
        #if window.ga != undefined
        #  window.ga 'send', 'pageview', path
      , 500)


  initActivePersist = ->

    $('.navbar-top a').click ->
      # immediately add .active to clicks as opposed to waiting for scrollspy to do it
      #persist allows for styling to stick even when scrollspy has to shuffle thru adjacent links

      $(".navbar li").removeClass('active active-persist')
      $(this).closest("li").addClass('active active-persist').blur()

    # remove active persist class when scrolled
    $(document).on utils.EVENT_SCROLL_ANIMATE_COMPLETE, ->
      $(".navbar-top li").removeClass('active-persist')

  initOffcanvasNav = () ->
    # provide scroll anchor delay for offcanvas nav links so nav can close before scroling strats
    # this helps with artifacting on mobile devices
    if Modernizr.cssanimations
      #$log.info 'assign datannchor 500'
      $items = $('.flyout .navbar  a')
      $items.each () ->
        $(this).attr("data-anchor-scroll-delay", "500")

  startup()
]

