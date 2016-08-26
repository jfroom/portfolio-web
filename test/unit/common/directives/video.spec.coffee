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
        @isVideoReady and @fixture.find('iframe').length
      , ->
        done()

  it 'should embed iframe, with src including video id', ->
    expect(@fixture.find('iframe').attr("src")).toMatch(new RegExp(@scope.item.id))

describe 'Unit: Testing directives.videoJsEmbed', ->

  it 'videojs lib hould be loaded', ->
    expect(videojs).toBeDefined()

  beforeEach (done) ->
    module('directives.videoJsEmbed')
    module('app.enums')
    inject ($injector) ->
      $timeout = $injector.get("$timeout")
      $rootScope = $injector.get("$rootScope")
      $compile = $injector.get("$compile")
      enums = $injector.get("enums")

      @scope =  $rootScope.$new()
      @scope.item =
        type: "video"
        poster: "http://vjs.zencdn.net/v/oceans.png"
        mp4: "http://vjs.zencdn.net/v/oceans.mp4"
      @fixture = setFixtures("<video video-js-embed='item' id='video-player' controls>")
      $rootScope.$on enums.EventType.VideoReady, => @isVideoReady = true
      $compile(@fixture)(@scope)
      @scope.$digest()

      # Wait for youtube video player to load
      waitsForAndRuns =>
        @isVideoReady and @fixture.find('.vjs-poster').length
      , ->
        done()

  it 'should embed video sources', ->
    @fixture.find("video#video-player_html5_api").length
    expect(@fixture.find('.vjs-poster').attr('style')).toMatch(RegExp(@scope.poster))
    ### travis breaks on this - can't load video files?
    expect(@fixture.find('video').attr('src'))
      .toMatch(RegExp("#{@scope.item.mp4}|#{@scope.item.webm}|#{@scope.item.ogg}"))
    ###
