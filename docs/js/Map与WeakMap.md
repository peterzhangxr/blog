# Map与WeakMap
## Map
Map 中存储的是 key-value 形式的键值对, 其中的 key 和 value 可以是任何类型的, 即对象也可以作为 key。 Map 的出现，就是让各种类型的值都可以当作键。Map 提供的是 “值-值”的对应。
## Map 和 Object 的区别
* 1.Object 对象有原型， 也就是说他有默认的 key 值在对象上面， 除非我们使用 Object.create(null)创建一个没有原型的对象；
* 2.在 Object 对象中， 只能把 String 和 Symbol 作为 key 值， 但是在 Map 中，key 值可以是任何基本类型(String, Number, Boolean, undefined, NaN….)，或者对象(Map, Set, Object, Function , Symbol , null….);
* 3.通过 Map 中的 size 属性， 可以很方便地获取到 Map 长度， 要获取 Object 的长度， 你只能手动计算

## Map 的属性
size: 返回集合所包含元素的数量
```js
const map = new Map()
map.set('foo', ture)
map.set('bar', false)
map.size // 2
```
## Map 对象的方法
* set(key, val): 向 Map 中添加新元素
* get(key): 通过键值查找特定的数值并返回
* has(key): 判断 Map 对象中是否有 Key 所对应的值，有返回 true，否则返回 false
* delete(key): 通过键值从 Map 中移除对应的数据
* clear(): 将这个 Map 中的所有元素删除
```js
  const m = new Map()
const o = { p: 'Hello World' }

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```
## 遍历方法
* keys()：返回键名的遍历器
* values()：返回键值的遍历器
* entries()：返回键值对的遍历器
* forEach()：使用回调函数遍历每个成员
```js
const map = new Map([
  ['a', 1],
  ['b', 2],
])

for (let key of map.keys()) {
  console.log(key)
}
// "a"
// "b"

for (let value of map.values()) {
  console.log(value)
}
// 1
// 2

for (let item of map.entries()) {
  console.log(item)
}
// ["a", 1]
// ["b", 2]

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value)
}
// "a" 1
// "b" 2

// for...of...遍历map等同于使用map.entries()

for (let [key, value] of map) {
  console.log(key, value)
}
// "a" 1
// "b" 2
```
## WeakMap
WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。

* 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
* 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
* 不能遍历，方法有 get、set、has、delete

## 总结
Map

* 是一种类似于字典的数据结构，本质上是键值对的集合
* 可以遍历，可以跟各种数据格式转换
* 操作方法有:set、get、has、delete、clear

WeakMap

* 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
* 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
* 不能遍历，方法有 get、set、has、delete
