window.blog = {
  initViewCount: ->
    view_cookie_id = "view-" + window.appData.page_id
    hostname = window.location.hostname
    bolForceIncrement = false
    bolSkipDomainTest = false
    bolIncrement = false
    if !store.enabled
      bolIncrement = true

    if !bolIncrement and
    store.get("omit_myself") != true and
    storeWithExpiration.get(view_cookie_id) == null
      if hostname.indexOf(window.appData.devHostname) == -1 and
      hostname.indexOf(window.appData.productionHostname) > -1
        bolIncrement = true
    if bolForceIncrement
      bolIncrement = true
    fb = new Firebase(window.appData.firebaseBlogDomain + window.appData.page_id)
    fb.once "value", (data) ->
      views = 0
      if data.val()
        views = data.val().views

      if bolIncrement || views == 0
          views += 1

      $(".detail-views .count").html views

      #set cookie to expire in 10 mins
      if bolIncrement || views == 0
        fb.set views: views
        storeWithExpiration.set view_cookie_id, "active", 1 * 60 * 1000
  init: () ->
    $(document).ready =>
      if window.appData.page_id != 'index'
        this.initViewCount()

      # uses plugin to update links with http:// to open in _blank target
      $('article').linkExternal();

      # uses plugin to swap youtube video load with an image
      # optimizeYouTubeEmbeds() # todo

      #rwd image maps
      $('img[usemap]').rwdImageMaps();

}

window.storeWithExpiration =
  set: (key, val, exp) ->
    store.set key,
      val: val
      exp: exp
      time: new Date().getTime()
  get: (key) ->
    info = store.get(key)
    return null  unless info
    return null  if new Date().getTime() - info.time > info.exp
    info.val

window.storeOmitMyself = (val) ->
  store.set "omit_myself", val
  store.get "omit_myself"

window.blog.init();
