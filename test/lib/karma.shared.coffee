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

# This is the equivalent of the old waitsFor/runs syntax
# which was removed from Jasmine 2
# https://gist.github.com/abreckner/110e28897d42126a3bb9
waitsForAndRuns = (escapeFunction, runFunction, escapeTime = 5000) ->
  # check the escapeFunction every millisecond so as soon as it is met we can escape the function
  interval = setInterval ->
    if escapeFunction()
      clearMe()
      runFunction()
  , 1

  # in case we never reach the escapeFunction, we will time out at the escapeTime
  timeOut = setTimeout ->
    clearMe()
    runFunction()
  , escapeTime

  # clear the interval and the timeout
  clearMe = ->
    clearInterval(interval)
    clearTimeout(timeOut)
