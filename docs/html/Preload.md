# Preload
## 核心概念
> `<link rel="preload">` 是一种 resource hint，用来指定页面加载后很快会被用到的资源(加载后并不执行)，所以在页面加载的过程中，我们希望在浏览器开始主体渲染之前尽早 preload。

默认情况下，一个 Vue CLI 应用会为所有初始化渲染需要的文件自动生成 preload 提示。

这些提示会被 [@vue/preload-webpack-plugin](https://github.com/vuejs/preload-webpack-plugin) 注入，并且可以通过 chainWebpack 的 config.plugin('preload') 进行修改和删除。


## 实践
webpack插件preload-webpack-plugin可以帮助我们将该过程自动化，结合htmlWebpackPlugin在构建过程中插入link标签。
```js
const PreloadWebpackPlugin = require('preload-webpack-plugin');
...
plugins: [
  new PreloadWebpackPlugin({
    rel: 'preload'，
    as(entry) {  //资源类型
      if (/\.css$/.test(entry)) return 'style';
      if (/\.woff$/.test(entry)) return 'font';
      if (/\.png$/.test(entry)) return 'image';
      return 'script';
    },
    include: 'asyncChunks', // preload模块范围，还可取值'initial'|'allChunks'|'allAssets',
    fileBlacklist: [/\.svg/] // 资源黑名单
    fileWhitelist: [/\.script/] // 资源白名单
  })
]
```

PreloadWebpackPlugin配置总体上比较简单，需要注意的是include属性。该属性默认取值'asyncChunks'，表示仅预加载异步js模块；如果需要预加载图片、字体等资源，则需要将其设置为'allAssets'，表示处理所有类型的资源。

但一般情况下我们不希望把预加载范围扩得太大，所以需要通过fileBlacklist或fileWhitelist进行控制。

对于异步加载的模块，还可以通过webpack内置的/_ webpackPreload: true _/标记进行更细粒度的控制。

以下面的代码为例，webpack会生成标签添加到html页面头部。
```js
import(/* webpackPreload: true */ 'AsyncModule');
```
> 备注：prefetch的配置与preload类似，但无需对as属性进行设置。

## 适用场景
从前文的介绍可知，preload的设计初衷是为了尽早加载首屏需要的关键资源，从而提升页面渲染性能。

目前浏览器基本上都具备预测解析能力，可以提前解析入口html中外链的资源，因此入口脚本文件、样式文件等不需要特意进行preload。

但是一些隐藏在CSS和JavaScript中的资源，如字体文件，本身是首屏关键资源，但当css文件解析之后才会被浏览器加载。这种场景适合使用preload进行声明，尽早进行资源加载，避免页面渲染延迟。

与preload不同，prefetch声明的是将来可能访问的资源，因此适合对异步加载的模块、可能跳转到的其他路由页面进行资源缓存；对于一些将来大概率会访问的资源，如上文案例中优惠券列表的背景图、常见的加载失败icon等，也较为适用。

## 最佳实践
* 大部分场景下无需特意使用preload
* 类似字体文件这种隐藏在脚本、样式中的首屏关键资源，建议使用preload
* 异步加载的模块（典型的如单页系统中的非首页）建议使用prefetch
* 大概率即将被访问到的资源可以使用prefetch提升性能和体验

> preload的字体资源必须设置crossorigin属性，否则会导致重复加载。

原因是如果不指定crossorigin属性(即使同源)，浏览器会采用匿名模式的CORS去preload，导致两次请求无法共用缓存。