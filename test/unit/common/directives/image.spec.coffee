describe 'Unit: Testing directives.image', ->


  $rootScope = $scope = $timeout = fixture = element = $compile = 1
  beforeEach(module('directives.image'))
  beforeEach(inject ($injector) ->

    $timeout = $injector.get("$timeout")
    $rootScope = $injector.get("$rootScope")
    $compile = $injector.get("$compile")
    $scope =  $rootScope.$new()

    path = ''
    if typeof window.__karma__ != 'undefined'
    	path += 'base/'
    jasmine.getFixtures().fixturesPath = path + 'test/fixtures'

    fixture = setFixtures("<img img-caption data-caption-link='http://www.flickr.com/' src='http://placehold.it/400x533&text=thumb-1' alt='Link Name' >")
    element = $compile(fixture)($scope)
  )


  it 'should have caption', ->
    expect(element.find(".caption").text()).toBe('Link Name')
  it 'should have image', ->
    expect(element.find(".img-wrap img").length).toBe(1)

  it 'should have no caption', ->
    fixture = setFixtures("<img img-caption data-caption-hide data-caption-link='http://www.flickr.com/' src='http://placehold.it/400x533&text=thumb-1' alt='Link Name' >")
    element = $compile(fixture)($scope)
    expect(element.find(".caption").length == 0).toBe(true)
