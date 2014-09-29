describe 'Unit: Testing services.navigation', ->
  $scope = utils = $location = $compile = $rootScope = 0

  beforeEach(module('services.navigation'))

  beforeEach(inject ($injector) ->
    $rootScope = $injector.get('$rootScope')
    $scope = $rootScope.$new()
    utils = $injector.get('utils')
    $location = $injector.get("$location")
    $compile = $injector.get("$compile")
    jQuery.fx.off = true


  )
  it 'scrollspy plugin should exist', ->
    expect($.fn.scrollspy).toBeDefined()

