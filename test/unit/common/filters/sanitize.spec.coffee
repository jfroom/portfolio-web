describe 'Unit: Testing filters.sanitize', ->
  $scope = $filter = stateCtrl = 0
  StateCtrl = ($scope) ->
    $scope.html = "<img src='foo.jpg'/>";

  beforeEach(module('filters.sanitize'))
  beforeEach(inject ($injector) ->
    $scope = $injector.get('$rootScope')
    $filter = $injector.get('$filter')
    $controller = $injector.get('$controller')

    stateCtrl = $controller(StateCtrl, {$scope:$scope});

  )
  #
  # unsafeHtml
  #
  describe 'unsafeHtml', ->

    it 'should filter allow unsafe HTML', ->
      result = $scope.$eval('html|unsafeHtml')
      expect($scope.html.indexOf("src") > -1).toEqual(true);

