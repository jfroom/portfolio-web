angular.module("directives.image", ["services.log", "services.utils"])
.directive("imgCaption", ["utils", "log", (utils, $log) ->
    restrict: "A"
    link: (scope, elm, attrs) ->
      elm = angular.element(elm)
      caption = attrs.alt
      classes = if attrs.class then attrs.class else ''

      elm.wrap("<span class='img-caption " + classes + "'></span>")
      link = attrs['captionLink']

      if link != undefined
      	caption = '<a href="' + link + '" target="_blank">' + caption + '</a>'
      elm.wrap("<span class='img-wrap-outer'><span class='img-wrap'></span></span>");
      if caption != undefined && !attrs.hasOwnProperty('captionHide')
      	elm.parent().append("<span class='caption'>" + caption + "</span>")
  ])
