(function() {
  var loader;

  loader = function(file, callback, isAsync) {
    var asyncLoad, head, syncLoad;
    if (isAsync == null) {
      isAsync = true;
    }
    file = typeof file === "string" ? [file] : file;
    head = document.head || document.getElementsByTagName('head')[0];
    asyncLoad = function() {
      var i, index, item, len, loaded, queue;
      loaded = 0;
      queue = [];
      for (index = i = 0, len = file.length; i < len; index = ++i) {
        item = file[index];
        queue[index] = document.createElement("script");
        queue[index].setAttribute("type", "text/javascript");
        queue[index].setAttribute("src", item);
        if (queue[index].addEventListener != null) {
          queue[index].addEventListener("load", function() {
            loaded++;
            if (loaded === file.length) {
              return typeof callback === "function" ? callback() : void 0;
            }
          }, false);
        } else {
          queue[index].attachEvent("onreadystatechange", function() {
            var target;
            target = window.event.srcElement;
            loaded++;
            if ((loaded === file.length) && (target.readyState === 'loaded')) {
              return typeof callback === "function" ? callback() : void 0;
            }
          });
        }
        head.appendChild(queue[index]);
      }
    };
    syncLoad = function() {
      var index, queue, recursiveLoad;
      index = 0;
      queue = [];
      recursiveLoad = function() {
        queue[index] = document.createElement("script");
        queue[index].setAttribute("type", "text/javascript");
        queue[index].setAttribute("src", file[index]);
        if (queue[index].addEventListener != null) {
          queue[index].addEventListener("load", function() {
            index++;
            if (index === file.length) {
              return typeof callback === "function" ? callback() : void 0;
            } else {
              return recursiveLoad();
            }
          }, false);
        } else {
          queue[index].attachEvent("onreadystatechange", function() {
            var target;
            target = window.event.srcElement;
            index++;
            if ((index === file.length) && (target.readyState === 'loaded')) {
              return typeof callback === "function" ? callback() : void 0;
            } else {
              return recursiveLoad();
            }
          });
        }
        return head.appendChild(queue[index]);
      };
      recursiveLoad();
    };
    if (isAsync) {
      return asyncLoad();
    } else {
      return syncLoad();
    }
  };

  this.loader = loader;

}).call(this);
