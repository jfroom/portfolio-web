describe 'Unit: Testing WorkCtrl', ->
  jasmine.getJSONFixtures().fixturesPath = appDataPath
  window.appData =
    'work':getJSONFixture('workData.json')
    'humans':getJSONFixture('humansData.json')
    'icons':getJSONFixture('iconsData.json')
    'build':'1'

  describe 'validate data', ->
    it 'should have valid work.json data', ->
      expect(appData.work.projects).toBeDefined()
      expect(__.isArray(appData.work.projects)).toBe(true)
      expect(__.everyHasKey(appData.work.projects, 'id')).toBe(true)

    it 'should have valid humans.json data', ->
      expect(appData.humans).toBeDefined()

      expect(__.isObject(appData.humans)).toBe(true)
      expect(appData.humans.humans).toBeDefined()
      expect(__.isArray(appData.humans.humans)).toBe(true)
      expect(__.everyHasKey(appData.humans.humans, 'id')).toBe(true)

      expect(appData.humans.roles).toBeDefined()
      expect(__.isArray(appData.humans.roles)).toBe(true)
      expect(__.isArray(appData.humans.roles)).toBe(true)
      expect(__.everyHasKey(appData.humans.roles, 'id')).toBe(true)

    it 'should have valid icons.json data', ->
      expect(appData.icons).toBeDefined()
      expect(__.isObject(appData.icons)).toBe(true)

      expect(appData.icons.tech).toBeDefined()
      expect(appData.icons.brand).toBeDefined()
      expect(appData.icons.recognition).toBeDefined()

      expect(__.isArray(appData.icons.tech)).toBe(true)
      expect(__.isArray(appData.icons.brand)).toBe(true)
      expect(__.isArray(appData.icons.recognition)).toBe(true)

      expect(__.everyHasKey(appData.icons.tech, 'id')).toBe(true)
      expect(__.everyHasKey(appData.icons.brand, 'id')).toBe(true)
      expect(__.everyHasKey(appData.icons.recognition, 'id')).toBe(true)

  describe 'Unit: Testing WorkCtrl', ->
    $rootScope = $controller = $location = locals = $window = 1
    createLocals = ->
      $scope: $rootScope.$new()
      #$location: jasmine.createSpyObj('$location', ['path'])
    runController = (locals) ->
      inject ($controller) ->
        $controller 'WorkCtrl', locals


    beforeEach(module('app.work'))
    beforeEach(inject ($injector) ->
      $rootScope = $injector.get("$rootScope")
      $controller = $injector.get("$controller")
      $location = $injector.get("$location")
      $window = $injector.get("$window")
      locals = createLocals()

    )
    it 'should be properly initialized', ->
      runController(locals)
      expect(locals.$scope.STATE_IDLE).toBeDefined()
      expect(locals.$scope.state).toBe(locals.$scope.STATE_IDLE)

    it 'should load a project', ->
      runController(locals)
      $location.path('/work/test-1')
      $rootScope.$apply()

      expect(locals.$scope.state).toBe(locals.$scope.STATE_DETAIL)
      expect(locals.$scope.workCur).toBeDefined()
      expect(locals.$scope.workCur.id).toBeDefined()
      expect(locals.$scope.workCur.id).toBe('test-1')

    it 'should projectIncrement', ->
      runController(locals)
      $location.path '/work/test-1'
      locals.$scope.$apply()
      locals.$scope.projectIncrement()
      locals.$scope.$apply()
      expect(locals.$scope.workCur?.id).toBe('test-2')

    it 'should unload project', ->

      runController(locals)
      $location.path('/work/test-1')
      $rootScope.$apply()
      $location.path('/')
      $rootScope.$apply()
      expect(locals.$scope.state).toBe(locals.$scope.STATE_IDLE)

    it 'should load second project after first project', ->
      runController(locals)
      $location.path('/work/test-1')
      $rootScope.$apply()
      $location.path('/work/test-2')
      $rootScope.$apply()
      expect(locals.$scope.state).toBe(locals.$scope.STATE_DETAIL)
      expect(locals.$scope.workCur.id).toBe('test-2')


