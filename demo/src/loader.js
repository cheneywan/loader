(function() {
  var asyncLoad, clear, head, root, syncLoad;

  root = this;

  head = document.head || document.getElementsByTagName('head')[0];

  clear = function(node) {
    var ref;
    node.onload = node.onreadystatechange = null;
    return (ref = node.parentNode) != null ? ref.removeChild(node) : void 0;
  };

  asyncLoad = function(scripts, callback) {
    var i, index, item, len, loaded, queue;
    loaded = 0;
    queue = [];
    for (index = i = 0, len = scripts.length; i < len; index = ++i) {
      item = scripts[index];
      queue[index] = document.createElement("script");
      queue[index].setAttribute("type", "text/javascript");
      queue[index].setAttribute("src", item);
      queue[index].done = false;
      queue[index].onload = queue[index].onreadystatechange = function() {
        if ((!this.done) && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
          loaded++;
          clear(this);
          this.done = true;
          if (loaded === scripts.length) {
            return typeof callback === "function" ? callback() : void 0;
          }
        }
      };
      head.appendChild(queue[index]);
    }
  };

  syncLoad = function(scripts, callback) {
    var index, queue, recursiveLoad;
    index = 0;
    queue = [];
    (recursiveLoad = function() {
      queue[index] = document.createElement("script");
      queue[index].setAttribute("type", "text/javascript");
      queue[index].setAttribute("src", scripts[index]);
      queue[index].done = false;
      queue[index].onload = queue[index].onreadystatechange = function() {
        if ((!this.done) && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
          index++;
          clear(this);
          this.done = true;
          if (index === scripts.length) {
            return typeof callback === "function" ? callback() : void 0;
          } else {
            return recursiveLoad();
          }
        }
      };
      return head.appendChild(queue[index]);
    })();
  };

  root.loadScripts = function(scripts, callback, isAsync) {
    if (isAsync == null) {
      isAsync = true;
    }
    scripts = typeof scripts === "string" ? [scripts] : scripts;
    if (isAsync) {
      return asyncLoad(scripts, callback);
    } else {
      return syncLoad(scripts, callback);
    }
  };

}).call(this);
