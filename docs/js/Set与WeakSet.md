# Set与WeakSet
## Set
Set 本身是一个构造函数，用来生成 Set 数据结构。Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。Set 对象允许你存储任何类型的值，无论是原始值或者是对象引用。它类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
const s = new Set()
[2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x))
for (let i of s) {
  console.log(i)
}
// 2 3 5 4

```
## Set 中的特殊值
Set 对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待：

* +0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复
* undefined 与 undefined 是恒等的，所以不重复
* NaN 与 NaN 是不恒等的，但是在 Set 中认为 NaN 与 NaN 相等，所有只能存在一个，不重复。

## Set 的属性：
size：返回集合所包含元素的数量
```js
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5])
items.size // 5
```
## Set 实例对象的方法
* add(value)：添加某个值，返回 Set 结构本身(可以链式调用)。
* delete(value)：删除某个值，删除成功返回 true，否则返回 false。
* has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
* clear()：清除所有成员，没有返回值。

```js
s.add(1).add(2).add(2)
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2)
s.has(2) // false
```

## 遍历方法
* keys()：返回键名的遍历器。
* values()：返回键值的遍历器。
* entries()：返回键值对的遍历器。
* forEach()：使用回调函数遍历每个成员。

由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 keys 方法和 values 方法的行为完全一致。
```js
let set = new Set(['red', 'green', 'blue'])

for (let item of set.keys()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item)
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

```

## Array 和 Set 对比
* Array 的 indexOf 方法比 Set 的 has 方法效率低下
* Set 不含有重复值（可以利用这个特性实现对一个数组的去重）
* Set 通过 delete 方法删除某个值，而 Array 只能通过 splice。两者的使用方便程度前者更优
* Array 的很多新方法 map、filter、some、every 等是 Set 没有的（但是通过两者可以互相转换来使用）

## Set 的应用
* 1、Array.from 方法可以将 Set 结构转为数组。
```js
const items = new Set([1, 2, 3, 4, 5])
const array = Array.from(items)
```
* 2、数组去重
```js
// 去除数组的重复成员
[...new Set(array)]

Array.from(new Set(array))
```
* 3、数组的 map 和 filter 方法也可以间接用于 Set
```js
let set = new Set([1, 2, 3])
set = new Set([...set].map((x) => x * 2))
// 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5])
set = new Set([...set].filter((x) => x % 2 == 0))
// 返回Set结构：{2, 4}
```
* 4、实现并集 (Union)、交集 (Intersect) 和差集
```js
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
let union = new Set([...a, ...b])
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)))
// set {2, 3}

// 差集
let difference = new Set([...a].filter((x) => !b.has(x)))
// Set {1}
```
## WeakSet
WeakSet 结构与 Set 类似，也是不重复的值的集合。
* 成员都是数组和类似数组的对象，若调用 add() 方法时传入了非数组和类似数组的对象的参数，就会抛出错误。
```js
const b = [1, 2, [1, 2]]
new WeakSet(b) // Uncaught TypeError: Invalid value used in weak set
```
* 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄漏。
* WeakSet 不可迭代，因此不能被用在 for-of 等循环中。
* WeakSet 没有 size 属性。

## 总结
Set

* 是一种叫做集合的数据结构(ES6新增的)
* 成员唯一、无序且不重复
* [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
* 允许储存任何类型的唯一值，无论是原始值或者是对象引用
* 可以遍历，方法有：add、delete、has、clear

WeakSet

* 成员都是对象
* 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄漏
* 不能遍历，方法有 add、delete、has