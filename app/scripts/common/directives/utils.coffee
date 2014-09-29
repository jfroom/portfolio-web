angular.module("directives.utils", ["services.utils"])
  .directive("utilHover", ["utils", "$log", (utils, $log) ->
    restrict: "A"
    link: (scope, elm, attrs) ->
      elm = $(elm) # this line is not needed if jQuery is loaded before Angular
      elm.addClass("js-hover").attr("data-hover", attrs.utilHover)

      utils.assignBtnHover elm.parent()
  ])
  .directive("utilChangePath", ["utils", "$location", "$log", "$timeout", "$route", "enums", "$rootScope", (utils, $location, $log, $timeout, $route, enums, $rootScope) ->
      restrict: "A"
      link: (scope, elm, attrs) ->
        angular.element(elm).on("click tap", (e) ->
          e.preventDefault()
          e.stopPropagation()
          dataAnchorDelay = $(this).attr("data-anchor-scroll-delay")
          delay = dataAnchorDelay ? dataAnchorDelay : 0
          $timeout.cancel $routePromise
          path = $location.path()
          $log.info 'scroll to path:' + attrs.utilChangePath + " delay: " + delay + " path:" + path
          if attrs.utilChangePath != path
            $log.info ' trigger path change'
            $routePromise = $timeout (->
              $location.path attrs.utilChangePath
            ), delay
          else
            $log.info ' trigger fake route change for anchor scroll'
            route = $route.current
            route.event = enums.EventType.AnchorScroll
            $rootScope.$broadcast '$routeChangeSuccess', $route, $route

        )
    ])
