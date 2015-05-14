loader = (file, callback, isAsync = true) ->

  file = if typeof file == "string" then [file] else file
  head = document.head or document.getElementsByTagName('head')[0]

  asyncLoad = ->
    loaded = 0
    queue = []
    for item, index in file
      queue[index] = document.createElement "script"
      queue[index].setAttribute "type", "text/javascript"
      queue[index].setAttribute "src", item

      if queue[index].addEventListener?
        queue[index].addEventListener "load", ->
          loaded++
          callback?() if loaded is file.length
        , false
      else
        queue[index].attachEvent "onreadystatechange", ->
          target = window.event.srcElement
          loaded++
          callback?() if (loaded is file.length) and (target.readyState is 'loaded')

      head.appendChild queue[index]
    return

  syncLoad = ->
    index = 0
    queue = []
    recursiveLoad = ->
      queue[index] = document.createElement "script"
      queue[index].setAttribute "type", "text/javascript"
      queue[index].setAttribute "src", file[index]

      if queue[index].addEventListener?
        queue[index].addEventListener "load", ->
          index++
          if index is file.length then callback?() else recursiveLoad()
        , false
      else
        queue[index].attachEvent "onreadystatechange", ->
          target = window.event.srcElement
          index++
          if (index is file.length) and (target.readyState is 'loaded') then callback?()  else recursiveLoad()

      head.appendChild queue[index]

    recursiveLoad()
    return

  if isAsync then asyncLoad() else syncLoad()

@.loader = loader