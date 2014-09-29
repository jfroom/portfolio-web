angular.module("filters.sanitize", []).filter "unsafeHtml", ($sce) ->
  (val) ->
    $sce.trustAsHtml val
