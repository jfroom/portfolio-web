# ENUMS
angular.module("app.enums", [])
  .constant "enums",
    EventType:
      WorkLoad: "work.load",
      AnchorScroll: "anchor.scroll"
      VideoStart: "video.start"
      VideoEnd: "video.end"
      TrackPageview: "track.pageview"
      TrackEvent: "track.event"
