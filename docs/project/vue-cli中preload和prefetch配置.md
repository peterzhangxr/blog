# vue-cli中preload和prefetch配置
## preload
默认情况下，一个Vue CLI应用会为所有初始化渲染需要的文件自动生成preload提示。这些提示会被@vue/preload-webpack-plugin注入，并且可以通过chainWebpack的config.plugin('preload')进行修改和删除。

## prefetch

默认情况下，一个Vue CLI应用会为所有作为async chunk生成的JavaScript文件(通过动态import()按需code splitting的产物)自动生成prefetch提示。这些提示会被@vue/preload-webpack-plugin注入，并且可以通过chainWebpack的config.plugin('prefetch')进行修改和删除。

