# dns-prefetch
```html
<link rel="dns-prefetch" href="https://cdn.bootcss.com">
```
preconnect 的浏览器兼容稍微比 dns-prefetch 低
因此 dns-prefetch 可以作为不支持预连接的浏览器的后备选择，同时配置它们两即可
```html
<link rel="preconnect" href="https://cdn.bootcss.com">
<link rel="dns-prefetch" href="https://cdn.bootcss.com">
```