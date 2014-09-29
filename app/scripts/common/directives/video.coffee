angular.module('directives.youtubeEmbed', ['app.enums']).directive "youtubeEmbed", ["$log", "$timeout", "$rootScope", "enums", ($log, $timeout, $rootScope, enums) ->
  priority: 0
  template: ""
  replace: false
  transclude: false
  restrict: "A"
  scope: {
    videoData: '=youtubeEmbed'
  }

  compile: compile = (tElement, tAttrs, transclude) ->
    #$log.info "yt compile"


    pre: preLink = (scope, iElement, iAttrs, controller) ->
      #console.log 'yt prelink ' + scope.videoData.id
      scope.hasStarted = false
      scope.loadAPI = ->

        # console.log "yt loadAPI"
        # 2. This code loads the IFrame Player API code asynchronously.
        tag = document.createElement("script")
        tag.src = "//www.youtube.com/iframe_api"
        firstScriptTag = document.getElementsByTagName("script")[0]
        firstScriptTag.parentNode.insertBefore tag, firstScriptTag
      scope.onAPIReady = ->
        #console.log "yt onAPIReady scope.videoData.id:" + scope.videoData.id
        scope.player = new YT.Player("youtube-player",
          #height: '390', width: '640',
          width: "1920", height: "1080"
          videoId: scope.videoData.id #"MpqY4gOdQBU" #'M7lc1UVf-VE',
          playerVars:
            #autohide:1
            enablejsapi: 1
            modestbranding: 1
            origin: document.domain
            showinfo: 0
            theme: "light"
            rel: 0
            ,vq: 'hd720',#'hd1080'
          # events:
          onReady: () ->

        )
        #TODO youtube start event
        scope.player.addEventListener 'onStateChange', (newState) ->

          $log.info "onPlayerStateChange:" + newState.data
          if !scope.hasStarted
            if newState.data == YT.PlayerState.PLAYING
              $log.info 'yt started'
              $rootScope.$broadcast enums.EventType.VideoStart, scope.videoData
              scope.hasStarted = true

          if scope.hasStarted && newState.data == YT.PlayerState.ENDED
            $rootScope.$broadcast enums.EventType.VideoEnd, scope.videoData


    post: postLink = (scope, iElement, iAttrs, controller) ->

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

###
angular.module('directives.videoJSEmbed', []).directive "videoJSEmbed", ["$log", "$timeout", "utils", ($log, $timeout, utils) ->
  priority: 0
  template: ""
  replace: false
  transclude: false
  restrict: "A"
  scope: {videoData: '=videoJS', videoId: '=VideoJSId'}
  compile: compile = (tElement, tAttrs, transclude) ->
  pre: preLink = (scope, iElement, iAttrs, controller) ->
    #$log.info "preLink compile"
  post: postLink = (scope, iElement, iAttrs, controller) ->
    #$log.info "postLink compile"
    console.log "video postlist", scope.videoData
    if scope && scope.videoData
      console.dir scope.videoData
      console.dir iAttrs
      console.log "scope.videoData.mp4:", scope.videoData.mp4
      if scope.videoData.mp4
        mp4src = scope.videoData.mp4.toString()
        #alert "Modernizr.highres " + Modernizr.highres + " Modernizr.video.h264:" + Modernizr.video.h264 + " touch: " + Modernizr.touch + " scope.videoData.mp4_low:" + scope.videoData.mp4_low
        #if Modernizr.touch && !Modernizr.highres && scope.videoData.mp4_low
        #mp4src = scope.videoData.mp4_low.toString()
        if Modernizr.video.h264 && scope.videoData.mp4_low
          mp4src = scope.videoData.mp4_low
        s = "<source type='video/mp4' src='" + mp4src + "' />"
      if scope.videoData.webm
        s += "<source type='video/webm' src='" + scope.videoData.webm.toString() + "' />"
      console.log s
      iElement.append s
      iElement.attr "poster", scope.videoData.poster.toString()

      delay = (ms, func) ->
        $timeout func, ms
      delay 0, ->
        if iAttrs
          console.log "video attr iAttrs"
          iElement.attr "id", scope.videoId + (new Date()).getTime()
          videoOptions = {'preload': 'metadata', 'width': 'auto', 'height': 'auto', 'controls': true }
          # poster':scope.videoData.poster.toString(),


          videojs((iElement.attr "id").toString(), videoOptions).ready ->
            console.log 'video ready'
]

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
