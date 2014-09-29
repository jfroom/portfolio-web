describe "E2E: Testing App", ->

  beforeEach ->
    browser.get '/'
    #browser.driver.sleep 2000


  it 'should do simple expect', ->
    log 'in it block -1'
    expect(true).toBe(true)
    log 'firstr assert passed'

  it 'should get current title', ->
    log 'trying to get title next'
    global.browser.getTitle().then (str) ->
      log 'got title:' + str
      expect(str.indexOf("Jeff Froom") > -1).toEqual(true);

  it "basic url structure", ->
    log 'in it block 2'
    browser.getCurrentUrl().then (url) ->
      parts = url.split("#!")
      expect(parts.length).toBe 2
      expect(parts[1]).toBe "/"


  it "bad url redirects to basic url", ->
    log 'in it block 3'
    browser.getCurrentUrl().then (url, err) ->
      browser.get "#!/nopenopenope123456"
      parts = url.split("#!")
      expect(parts[1]).toBe "/"


  it "page loads #/work and scrolls to work anchor ", ->
    log 'in it block 4'
    global.specUtils.assertUrlHashAndAnchorScroll "work", "work"

  it "page loads #/about and scrolls to about anchor ", ->
    log 'in it block 5'
    global.specUtils.assertUrlHashAndAnchorScroll "about", "about"

  it "page loads #/ and scrolls to home anchor ", ->
    log 'in it block 6'
    browser.get global.specUtils.workUrl
    browser.sleep global.specUtils.anchorScrollDuration
    global.specUtils.assertUrlHashAndAnchorScroll "", "home"
