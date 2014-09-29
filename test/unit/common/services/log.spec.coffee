describe 'Unit: Testing services.log', ->
  $scope = log = 0
  isPhantomBrowser = /phantom/i.test(navigator.userAgent)
  jQuery.fx.off = true
  beforeEach(module('services.log'))
  beforeEach(inject ($injector) ->
    $scope = $injector.get('$rootScope')
    log = $injector.get('log')

  )

  it 'should exist', ->
    expect(log).toBeDefined()
    expect(log.info).toBeDefined()
    #log.setLevel(log.setLevel(log4javascript.Level.INFO))
    #log.info('Unit: Testing services.log')