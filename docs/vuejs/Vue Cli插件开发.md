# Vue插件开发
* 一个 CLI 插件是一个 npm 包，它能够为 Vue CLI 创建的项目添加额外的功能，这些功能包括：

* 修改项目的 webpack 配置 - 例如，如果你的插件希望去针对某种类型的文件工作，你可以为这个特定的文件扩展名添加新的 webpack 解析规则。比如说，@vue/cli-plugin-typescript 就添加这样的规则来解析 .ts 和 .tsx 扩展的文件；
* 添加新的 vue-cli-service 命令 - 例如，@vue/cli-plugin-unit-jest 添加了 test:unit 命令，允许开发者运行单元测试；
* 扩展 package.json - 当你的插件添加了一些依赖到项目中，你需要将他们添加到 package 的 dependencies 部分时，这是一个有用的选项；
* 在项目中创建新文件、或者修改老文件。有时创建一个示例组件或者通过给入口文件（main.js）添加导入（imports）是一个好的主意；
* 提示用户选择一个特定的选项 - 例如，你可以询问用户是否创建我们前面提到的示例组件。
  
[示例项目](https://github.com/peterzhangxr/vue-cli-plugin-pconsole.git)