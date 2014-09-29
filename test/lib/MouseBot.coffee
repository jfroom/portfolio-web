window.MouseBot =
    simulateMouseEvent: (type, x, y) ->
      ev = document.createEvent("MouseEvent")
      el = document.elementFromPoint(x, y)
      ev.initMouseEvent(
        type, # 'click'
        true,  #bubble
        true, #cancelable
        window,
          null,
          x, y, # screen coords
        x, y, # client coords
        false, false, false, false,  #modifier keys
        0, #left
        null
      )
      el.dispatchEvent ev