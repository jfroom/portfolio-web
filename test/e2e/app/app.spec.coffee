app = new (require('../pageObjects/appPage.coffee'))()

describe "E2E: Testing App", ->
  beforeEach (done) ->
    app.get done

  it 'should do simple expect', ->
    expect(true).toBe(true)

  it 'should get current title', (done) ->
    browser.getTitle().then (str) ->
      expect(str.indexOf("Site Title") > -1).toEqual(true)
      done()

  it "basic url structure", (done) ->
    browser.getCurrentUrl().then (url) ->
      parts = url.split("#!")
      expect(parts.length).toBe 2
      expect(parts[1]).toBe "/"
      done()

  it "bad url redirects to basic url", (done) ->
    browser.getCurrentUrl().then (url, err) ->
      app.get "nopenopenope123456"
      parts = url.split("#!")
      expect(parts[1]).toBe "/"
      done()

  it "page loads #/work and scrolls to work anchor", (done) ->
    app.navigateAssert app.URL_HASH.WORK, done

  it "page loads #/about and scrolls to about anchor ", (done) ->
    app.navigateAssert app.URL_HASH.ABOUT, done

  it "page loads #/ and scrolls to home anchor ", (done) ->
    browser.navigate().to(app.getUrl(app.URL_HASH.WORK))
    app.navigateAssert app.URL_HASH.HOME, done
