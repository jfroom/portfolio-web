if window.appData
  console?.log "[APP] build:" + window.appData.build

window.app = angular.module "app", ["ngSanitize", "services.utils",  "services.log",  "directives.utils", "directives.image", "directives.html", "services.navigation", "app.enums", "app.work", "ngRoute", "angularMoment"]

# ROUTES
app.value('$anchorScroll', angular.noop);
app.config ["$routeProvider", "$locationProvider", "$interpolateProvider", "enums", ($routeProvider, $locationProvider, $interpolateProvider, enums) ->

  # change double curly braces because they conflict with jekyll/liquid/hbs syntax
  $interpolateProvider.startSymbol('{[').endSymbol(']}');

  # fix incoming links that have # instead of #!
  if window.location.hash.indexOf("#") > -1 && window.location.hash.indexOf("#!") <= -1
    window.location.hash = window.location.hash.replace("#","#!");


  $routeProvider
    .when('/work/:project', event: enums.EventType.WorkLoad)
    .when('/about', event: enums.EventType.AnchorScroll)
    .when('/contact', event: enums.EventType.AnchorScroll)
    .when('/work', event: enums.EventType.AnchorScroll)
    .otherwise(redirectTo: '/')
  $locationProvider.html5Mode(false).hashPrefix('!')
]
# disable auto scrolling


# RUN
app.run ["utils", "enums", "$rootScope", "$location", "$routeParams", "$route", "log", "$timeout", "navigation"
, (utils, enums, $rootScope, $location, $routeParams, $route, $log, $timeout, navigation) ->

    # for karma testing, only set log level
    if angular.isDefined($rootScope.logger) && angular.isDefined(log4javascript)
      if angular.isDefined(window) && angular.isDefined(window.__karma__)
        $rootScope.logger.setLevel(log4javascript.Level.WARN)

    $rootScope.utils = utils #allows html bindings to call utils

    # ROUTES
    $routePromise = null
    lastRoutePath = ''
    $rootScope.$on '$routeChangeSuccess', ($currentRoute, $previousRoute) ->
      $log.info "$routeChangeSuccess $currentRoute: #{$currentRoute} $location.path:" + $location.path() + " lastRoutePath:" + lastRoutePath

      path = $location.path()
      event = $route.current?.event

      # change path / to anchor to #home
      # don't allow scroll first page load on / path - endup fighting with scroller

      if path == '/'
        event = enums.EventType.AnchorScroll
        path = '/home'

        # don't scroll if it's the initial page load
        if lastRoutePath == ''
          event = undefined

      # ANCHOR HANDLING
      if event == enums.EventType.AnchorScroll
        $log.info("scrolling for path: " + path)

        if path
          id = path.substr 1, path.length-1
          id = id.split('/')[0]
          $log.info "id " + id + " path:" + path
          $timeout.cancel $routePromise
          $routePromise = $timeout (->
            utils.scrollAnimateTo "#" + id
          ), 1

      $rootScope.$broadcast enums.EventType.TrackPageview, path

    # TRACKING
    $rootScope.$on enums.EventType.TrackPageview, (scope, path) ->
      #$log.info 'catch trackpage view for GA path: ' + path + " lastRoutePath:" + lastRoutePath
      if window.ga != undefined && lastRoutePath != path
        window.ga 'send', 'pageview', path
        lastRoutePath = path
    $rootScope.$on enums.EventType.TrackEvent, (scope, category, action, label, value) ->
      $log.info 'caught track event category:' + category + " action:" + action + " label:" + label + " value:" + value
      if window.ga != undefined
        window.ga 'send', 'event', category, action, label, value
]
