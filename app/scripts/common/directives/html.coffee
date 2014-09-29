angular.module("directives.html", ["services.log", "services.utils"])
.directive("angularBindHtml", ["$compile", "log", ($compile, $log) ->
  restrict: "A"
  link: (scope, elm, attrs) ->
    scope.$watch attrs.angularBindHtml, (newValue, oldValue) ->
      if newValue #and newValue isnt oldValue
        elm.html newValue
        $compile(elm.contents()) scope
])

# A links will add a target of _blank if no target exists and url starts with http
.directive("a", ["log", ($log) ->
  restrict: "E"
  link: (scope, elm, attrs) ->
    if elm.attr("href")?.indexOf("http") > -1 && elm.attr('target') == undefined
        elm.attr('target','_blank');
  ])
