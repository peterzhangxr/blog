# Prefetch
## 核心概念
链接预取是一种浏览器机制，其利用浏览器空闲时间来下载或预取用户在不久的将来可能访问的文档。网页向浏览器提供一组预取提示，并在浏览器完成当前页面的加载后开始静默地拉取指定的文档并将其存储在缓存中。当用户访问其中一个预取文档时，便可以快速的从浏览器缓存中得到。

浏览器会查找关系类型(rel)为 next 或 prefetch 的 HTML<link>  或 HTTP Link: header。
```html
<link rel="prefetch" href="/images/big.jpeg">
```
同样效果的使用 HTTP Link: header 的例子：
```http
Link: </images/big.jpeg>; rel=prefetch
```
Link: header 也可以通过使用 HTML meta 标签定义在 HTML 文档中：
```html
<meta http-equiv="Link" content="</images/big.jpeg>; rel=prefetch">
```
浏览器检查所有这些预取提示，并将每一个独立的请求排到队列之中，然后浏览器空闲时将对这些请求进行预取。每个页面都可以有多个预取提示，因为预取多个文档是合理的。例如，未来要访问的页面可能包含多张大图。
```html
<link rel="prefetch alternate stylesheet" title="Designed for Mozilla" href="mozspecific.css">
<link rel="next" href="2.html">
```

## 标签(<a>) 会被预取吗？
不会，只有带有关系类型为 next 或 prefetch 的 <link> 标签会被预拉取。但是，如果该特性收到足够的关注，我们在未来可能会支持带有关系类型为 next 或 prefetch 的 <a> 标签的预取。这样做可能会帮助内容提供者避免预取内容过期的问题。

## 资源正在被预载时点击了某个链接会发生什么？
当用户点击一个连接，或开始任何形式的页面加载时，预取操作将被停止且任何预取提示将被丢弃。如果一个预取文档只下载了一部分，那么这部分文档将被保存在缓存中，供服务端发送一个 "Accept-Ranges: bytes" 的返回头。这个返回头通常是由网络服务器在返回静态内容时生成的。当用户真正访问这个已经（部分）预载过的文档时，该文档的剩余部分将被通过一个 HTTP byte-range 的请求获取。


## Vue Cli的处理
<link rel="prefetch"> 是一种 resource hint，用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。

默认情况下，一个 Vue CLI 应用会为所有作为 async chunk 生成的 JavaScript 文件 (通过动态 import() 按需 code splitting 的产物) 自动生成 prefetch 提示。

这些提示会被 @vue/preload-webpack-plugin 注入，并且可以通过 chainWebpack 的 config.plugin('prefetch') 进行修改和删除。

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
  }
}
```
当 prefetch 插件被禁用时，你可以通过 webpack 的内联注释手动选定要提前获取的代码区块：
```js
import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
```
webpack 的运行时会在父级区块被加载之后注入 prefetch 链接。
> #### 提示
> Prefetch 链接将会消耗带宽。如果你的应用很大且有很多 async chunk，而用户主要使用的是对带宽较敏感的移动端，那么你可能需要关掉 prefetch 链接并手动选择要提前获取的代码区块。
