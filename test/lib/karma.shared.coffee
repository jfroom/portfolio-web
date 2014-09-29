log = (s) ->
  console.log s

__ = _.noConflict()

__.mixin {
  'everyHasKey': (collection, key) ->
    __.every collection, (item)->
      !__.isUndefined(item[key])
}

appDataPath = 'app/assets/data/'
testDataPath = 'test/fixtures/assets/data/'
if typeof window.__karma__ != 'undefined'
  testDataPath = 'base/' + testDataPath
  appDataPath = 'base/' + appDataPath

#log "appDataPath:" + appDataPath
#jasmine.getJSONFixtures().fixturesPath = path


isPhantomBrowser = /phantom/i.test(navigator.userAgent)
isMobileBrowser = /(iPod|iPhone|iPad|Android)/i.test(navigator.userAgent)
