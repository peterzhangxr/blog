# Vuex面试题

## 在Vuex中使用mutation要注意什么。
mutation 必须是同步函数
## Vuex中action和mutation有什么区别？
* action 提交的是 mutation，而不是直接变更状态。mutation可以直接变更状态。
* action 可以包含任意异步操作。mutation只能是同步操作。
* 提交方式不同，action 是用this.$store.dispatch('ACTION_NAME',data)来提交。mutation是用this.$store.commit('SET_NUMBER',10)来提交。
* 接收参数不同，mutation第一个参数是state，而action第一个参数是context，其包含了
```js
{
    state,      // 等同于 `store.state`，若在模块中则为局部状态
    rootState,  // 等同于 `store.state`，只存在于模块中
    commit,     // 等同于 `store.commit`
    dispatch,   // 等同于 `store.dispatch`
    getters,    // 等同于 `store.getters`
    rootGetters // 等同于 `store.getters`，只存在于模块中
}

```
## 在模块中，getter和mutation接收的第一个参数state，是全局的还是模块的？
第一个参数state是模块的state，也就是局部的state。
## 在模块中，getter和mutation和action中怎么访问全局的state和getter？

* 在getter中可以通过第三个参数rootState访问到全局的state,可以通过第四个参数rootGetters访问到全局的getter。
* 在mutation中不可以访问全局的satat和getter，只能访问到局部的state。
* 在action中第一个参数context中的context.rootState访问到全局的state，context.rootGetters访问到全局的getter。

## 用过Vuex模块的命名空间吗？为什么使用，怎么使用。
默认情况下，模块内部的action、mutation和getter是注册在全局命名空间，如果多个模块中action、mutation的命名是一样的，那么提交mutation、action时，将会触发所有模块中命名相同的mutation、action。

这样有太多的耦合，如果要使你的模块具有更高的封装度和复用性，你可以通过添加namespaced: true 的方式使其成为带命名空间的模块。

## 怎么在带命名空间的模块内提交全局的mutation和action？
将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。

## 怎么在带命名空间的模块内注册全局的action？
```js
	actions: {
		actionA: {
				root: true,
				handler (context, data) { ... }
		}
	}
```
## 怎么使用mapState，mapGetters，mapActions和mapMutations这些函数来绑定带命名空间的模块？
首先使用createNamespacedHelpers创建基于某个命名空间辅助函数
## Vuex插件有用过吗？怎么用简单介绍一下？
Vuex插件就是一个函数，它接收 store 作为唯一参数。在Vuex.Store构造器选项plugins引入。 在store/plugin.js文件中写入

## 在Vuex插件中怎么监听组件中提交mutation和action？
* 用Vuex.Store的实例方法subscribe监听组件中提交mutation
* 用Vuex.Store的实例方法subscribeAction监听组件中提交action 在store/plugin.js文件中写入
