describe 'Unit: Testing directives.youtubeEmbed', ->

  # youtube iframe api https://developers.google.com/youtube/iframe_api_reference
  $rootScope = $scope = $timeout = fixture = 1
  beforeEach(module('directives.youtubeEmbed'))
  beforeEach(inject ($injector) ->

    $timeout = $injector.get("$timeout")
    $rootScope = $injector.get("$rootScope")
    $compile = $injector.get("$compile")

    $scope =  $rootScope.$new()
    $scope.item = {"type": "youtube", "id": "BvAeabvZ61o"}
    fixture = setFixtures('<div youtube-embed="item"><div id="youtube-player"></div></div>')
    element = $compile(fixture)($scope)
  )


  it 'should embed iframe, with src including video id', ->
    $scope.$digest()
    waitsFor ->
      fixture.find('iframe').length > 0
    , 'YT player to load', 5 * 1000
    runs ->
      src = fixture.find('iframe').attr("src")
      vidLoading = src.indexOf($scope.item.id) > 0
      expect(vidLoading).toBe(true)


  #window.onYouTubeIframeAPIReady = ->
  #  console.log "spec onYouTubeIframeAPIReady"
