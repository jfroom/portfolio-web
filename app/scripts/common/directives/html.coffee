angular.module("directives.html", ["services.log", "services.utils"])
.directive("angularBindHtml", ["$compile", "log", ($compile, $log) ->
  restrict: "A"
  link: (scope, elm, attrs) ->
    scope.$watch attrs.angularBindHtml, (newValue, oldValue) ->
      if newValue?
        elm.html newValue
        $compile(elm.contents()) scope
])

# A links will add a target of _blank if no target exists and url starts with http
.directive("a", ["log", ($log) ->
  restrict: "E"
  link: (scope, elm, attrs) ->
    if elm.attr("href")?.indexOf("http") > -1 and not elm.attr('target')?
      elm.attr('target', '_blank')

    # Blur after clicks on button links. Resolves styling glitch with bootstrap
    if elm.hasClass 'btn'
      elm.bind 'click', ->
        elm.blur()
      scope.$on '$destroy', ->
        elm.unbind 'click', -> elm.blur()

])
