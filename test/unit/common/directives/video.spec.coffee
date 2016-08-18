describe 'Unit: Testing directives.youtubeEmbed', ->

  beforeEach (done) ->
    # youtube iframe api https://developers.google.com/youtube/iframe_api_reference
    #beforeEach(module('directives.youtubeEmbed'))
    #beforeEach(module('app.enums'))
    module('directives.youtubeEmbed')
    module('app.enums')
    inject ($injector) ->
      $timeout = $injector.get("$timeout")
      $rootScope = $injector.get("$rootScope")
      $compile = $injector.get("$compile")
      enums = $injector.get("enums")

      @scope =  $rootScope.$new()
      @scope.item = {"type": "youtube", "id": "BvAeabvZ61o"}
      @fixture = setFixtures('<div youtube-embed="item"><div id="youtube-player"></div></div>')
      $rootScope.$on enums.EventType.VideoReady, => @isVideoReady = true
      $compile(@fixture)(@scope)
      @scope.$digest()

      # Wait for youtube video player to load
      waitsForAndRuns =>
        @fixture.find('iframe').length and @isVideoReady
      , ->
        done()

  it 'should embed iframe, with src including video id', ->
    src = @fixture.find('iframe').attr("src")
    vidLoading = src.indexOf(@scope.item.id) > 0
    expect(vidLoading).toBe(true)
