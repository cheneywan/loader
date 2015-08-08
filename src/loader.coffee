
root = this

head = document.head or document.getElementsByTagName('head')[0]

clear = (node) ->
  node.onload = node.onreadystatechange = null
  node.parentNode?.removeChild node

asyncLoad = (scripts, callback) ->
  loaded = 0
  queue = []
  for item, index in scripts
    queue[index] = document.createElement "script"
    queue[index].setAttribute "type", "text/javascript"
    queue[index].setAttribute "src", item
    queue[index].done = false

    queue[index].onload = queue[index].onreadystatechange = ->
      if (!this.done) and (!this.readyState or this.readyState == 'loaded' or this.readyState == 'complete')
        loaded++
        clear this
        this.done = true
        callback?() if loaded is scripts.length

    head.appendChild queue[index]
  return

syncLoad = (scripts, callback) ->
  index = 0
  queue = []
  do recursiveLoad = ->
    queue[index] = document.createElement "script"
    queue[index].setAttribute "type", "text/javascript"
    queue[index].setAttribute "src", scripts[index]
    queue[index].done = false

    queue[index].onload = queue[index].onreadystatechange = ->
      if (!this.done) and (!this.readyState or this.readyState == 'loaded' or this.readyState == 'complete')
        index++
        clear this
        this.done = true
        if index is scripts.length then callback?() else recursiveLoad()

    head.appendChild queue[index]
  return

root.loadScripts = (scripts, callback, isAsync = true) ->
  scripts = if typeof scripts == "string" then [scripts] else scripts

  if isAsync then asyncLoad(scripts, callback) else syncLoad(scripts, callback)
