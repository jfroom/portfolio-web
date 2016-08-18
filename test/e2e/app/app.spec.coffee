app = new (require('../pageObjects/appPage.coffee'))()

describe "E2E: Testing App", ->
  beforeEach ->
    app.get()

  it 'should do simple expect', ->
    expect(true).toBe(true)

  it 'should get current title', ->
    browser.getTitle().then (str) ->
      expect(str.indexOf("Site Title") > -1).toEqual(true)

  it "basic url structure", ->
    browser.getCurrentUrl().then (url) ->
      parts = url.split("#!")
      expect(parts.length).toBe 2
      expect(parts[1]).toBe "/"

  it "bad url redirects to basic url", ->
    browser.getCurrentUrl().then (url, err) ->
      app.get "nopenopenope123456"
      parts = url.split("#!")
      expect(parts[1]).toBe "/"

  it "page loads #/work and scrolls to work anchor ", ->
    app.navigateAssert app.URL_HASH.WORK

  it "page loads #/about and scrolls to about anchor ", ->
    app.navigateAssert app.URL_HASH.ABOUT

  it "page loads #/ and scrolls to home anchor ", ->
    app.get app.URL_HASH.WORK
    app.navigateAssert app.URL_HASH.HOME
