angular.module('directives.youtubeEmbed', ['app.enums'])
.directive "youtubeEmbed", ["$log", "$timeout", "$rootScope", "enums", ($log, $timeout, $rootScope, enums) ->
  priority: 0
  template: ""
  replace: false
  transclude: false
  restrict: "A"
  scope: {
    videoData: '=youtubeEmbed'
  }
  compile: ->
    pre: (scope) ->
      scope.hasStarted = false
      scope.loadAPI = ->
        tag = document.createElement("script")
        tag.src = "//www.youtube.com/iframe_api"
        firstScriptTag = document.getElementsByTagName("script")[0]
        firstScriptTag.parentNode.insertBefore tag, firstScriptTag
      scope.onAPIReady = ->
        scope.player = new YT.Player("youtube-player",
          width: "1920", height: "1080"
          videoId: scope.videoData.id
          playerVars:
            enablejsapi: 1
            modestbranding: 1
            origin: document.domain
            showinfo: 0
            theme: "light"
            rel: 0
            vq: 'hd720'
        )
        scope.player.addEventListener 'onStateChange', (newState) ->
          if !scope.hasStarted
            if newState.data == YT.PlayerState.PLAYING
              $log.info 'yt started'
              $rootScope.$broadcast enums.EventType.VideoStart, scope.videoData
              scope.hasStarted = true

          if scope.hasStarted && newState.data == YT.PlayerState.ENDED
            $rootScope.$broadcast enums.EventType.VideoEnd, scope.videoData
        scope.player.addEventListener 'onReady', ->
          $rootScope.$broadcast enums.EventType.VideoReady, scope.videoData
    post: (scope) ->
      ytLoaded = window.YT != undefined && window.YT.Player != undefined
      if !ytLoaded
        _onYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady
        window.onYouTubeIframeAPIReady = ->
          if (_onYouTubeIframeAPIReady != undefined)
            _onYouTubeIframeAPIReady()
          scope.onAPIReady()
          delete window.onYouTubeIframeAPIReady
        scope.loadAPI()
      else
        scope.onAPIReady()
]

angular.module('directives.videoJsEmbed', ['app.enums'])
.directive "videoJsEmbed", ["$log", "$timeout", "$rootScope", "enums", ($log, $timeout, $rootScope, enums) ->
  priority: 0
  template: ""
  replace: false
  transclude: false
  restrict: "A"
  scope: {videoData: '=videoJsEmbed', videoId: '=VideoJsId'}
  compile: ->
    post: (scope, iElement) ->
      if scope && scope.videoData
        if scope.videoData.mp4
          mp4src = scope.videoData.mp4.toString()
          if Modernizr.video.h264 and scope.videoData.mp4_low
            mp4src = scope.videoData.mp4_low
        player = videojs iElement.attr("id"),
          controlBar: {volumeMenuButton: false}, fluid: true, preload: 'metadata'
        , ->
          player.poster scope.videoData.poster
          player.src(
            {type: "video/mp4", src: mp4src}
          )
          player.addChild('BigPlayButton');
          player.one 'play', ->
            $rootScope.$broadcast enums.EventType.VideoStart, scope.videoData
          player.one 'ended', ->
            $rootScope.$broadcast enums.EventType.VideoEnd, scope.videoData
          $rootScope.$broadcast enums.EventType.VideoReady, scope.videoData
        scope.$on '$destroy', ->
          player?.dispose()
]

###
angular.module('directives.vimeoEmbed', []).directive "vimeoEmbed", ["$log", "$timeout", ($log, $timeout) ->
  priority: 0
  template: ""
  # templateUrl: "directive.html"
  replace: false
  transclude: false
  restrict: "A"
  scope: {videoData: '=vimeoEmbed'}
  compile: compile = (tElement, tAttrs, transclude) ->
  pre: preLink = (scope, iElement, iAttrs, controller) ->
    console.log 'prelink'
    parts = scope.videoData.src.split("/")
    iElement.attr "id", "vimeo-" + parts[parts.length - 1]
    iElement.attr "player-id", "vimeo-" + parts[parts.length - 1]
    iElement.attr "api", "1"

    player = $("#" + iElement.attr("id"))

    try
      fPlayer = $f(player[0])
      player.hide()
      # When the player is ready, add listeners for pause, finish, and playProgress
      fPlayer.addEvent "ready", ->
        console.log "ready"
        setTimeout ->
        player.delay(0).fadeIn(500)
        fPlayer.addEvent "play", ->
          console.log "play"
        fPlayer.addEvent "pause", ->
          console.log 'pause'
        fPlayer.addEvent "finish", ->
          console.log "finish"
    catch e
      player.show()


  post: postLink = (scope, iElement, iAttrs, controller) ->
    $log.info "postLink compile"
    console.log "vimeo postlist", iElement, iAttrs, scope.videoData
    iElement.attr "src", scope.videoData.src + "?api=1&player_id=" + iElement.attr "player-id"
    console.log "width:" + $(iElement).width()
    $log.info 'postLink compile'


]
###
