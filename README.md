# loader

动态加载多个或单个 js 文件，支持同步或异步队列加载，无须依赖

```

    loadScripts([
      "http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js",
      "http://apps.bdimg.com/libs/jqueryui/1.9.2/jquery-ui.min.js",
      "http://apps.bdimg.com/libs/jquery-scrollUp/2.1.0/jquery.scrollUp.min.js"
    ], function(){console.log("加载成功")}, false)

```