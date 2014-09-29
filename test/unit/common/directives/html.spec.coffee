describe 'Unit: Testing directives.html', ->


  $rootScope = $scope = $timeout = fixture = element = $compile = 1
  StateCtrl = ($scope) ->
    str = "<a aa id='link1' href='http://google2.com' >";
    str += "<img src='http://placehold.it/400x533&text=thumb-1' alt='Link Name' >"
    str += "</a>"
    str += "<a href='#work' id='link2'>link2</a>"
    str += "<a id='link3' href='http://google.com' target='mytarget'>link3</a>"
    $scope.html = str;
    $scope.foo = 1

  beforeEach(module('directives.html'))
  beforeEach(inject ($injector) ->

    $timeout = $injector.get("$timeout")
    $rootScope = $injector.get("$rootScope")
    $compile = $injector.get("$compile")
    $controller = $injector.get("$controller")
    $scope =  $rootScope.$new()
    stateCtrl = $controller(StateCtrl, {$scope:$scope})

    path = ''
    if typeof window.__karma__ != 'undefined'
    	path += 'base/'
    jasmine.getFixtures().fixturesPath = path + 'test/fixtures'

    fixture = setFixtures("<div>wrap<div angular-bind-html='html'></div></div>")

    element = $compile(fixture)($scope)
    $scope.$digest()

  )

  describe 'angularBindHtml', ->

    it 'should filter allow unsafe HTML', ->
      expect(element.find("img").attr('src') != undefined).toBe(true)

  describe 'A tag override for _blank targets', ->

    it 'should add a blank target', ->
      expect(element.find("#link1").attr('target') == "_blank").toBe(true)

    it 'should not add a blank target to link without http in front', ->
      expect(element.find("#link2").attr('target') == undefined).toBe(true)

    it 'should not add a blank target to link with existing target', ->
      expect(element.find("#link3").attr('target') == 'mytarget').toBe(true)


