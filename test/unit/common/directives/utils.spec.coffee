describe 'Unit: Testing directives.utils', ->

  describe 'utilHover directive', ->
    $rootScope = $scope = fixture = element = utils = 1
    beforeEach(module('directives.utils'))
    beforeEach(inject ($injector) ->

      $rootScope = $injector.get("$rootScope")
      $compile = $injector.get("$compile")
      utils = $injector.get("utils")

      setFixtures('<a util-hover="hoverable">link</a>')

      $scope =  $rootScope.$new()
      fixture = $('a')
      element = $compile(fixture)($scope)
    )

    it 'should add "js-hover" class and util-hover attribute as class', ->
      expect(element).toHaveClass('js-hover')
      expect(element).toHaveAttr('data-hover', 'hoverable')

    it 'should be configurable via options attribute', ->
      element.trigger("mouseover")
      expect(element).toHaveClass("hoverable")
