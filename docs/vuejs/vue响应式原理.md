# Vue2.0响应式原理
> 非侵入式

> React的setState和小程序setData 是侵入式

## Object.defineProperty
```js
const obj = {}
Object.defineProperty({}, 'a', {
	value: 1,
	writable: true,//可赋值
	enumerable: true, //枚举 循环
	get () {},
	set () {}
})
```