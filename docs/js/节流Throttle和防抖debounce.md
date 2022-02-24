# 节流(Throttle)和防抖(debounce)
## 本质
> 这两个东西都是以闭包的形式存在。他们通过对事件对应的回调函数进行包裹，以自由变量的形式缓存时间信息，最后用setTimeout来控制事件的触发频率。

## 节流
throttle 的中心思想在于：在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。

总结下来，所谓的“节流”，是通过在一段时间内无视后来产生的回调请求来实现的。只要一位客人叫了车，司机就会为他开启计时器，一定的时间内，后面需要乘车的客人都得排队上这一辆车，谁也无法叫到更多的车。

对应到实际的交互上是一样一样的：每当用户触发了一次 scroll 事件，我们就为这个触发操作开启计时器。一段时间内，后续所有的 scroll 事件都会被当作“一辆车的乘客”——它们无法触发新的 scroll 回调。直到“一段时间”到了，第一次触发的 scroll 事件对应的回调才会执行，而“一段时间内”触发的后续的 scroll 回调都会被节流阀无视掉。

```js
function throttle(fn, interval) {
	let last = 0
	return function () {
		let context = this
		let args = arguments
		let now = +new Date()
		if (now - last > interval) {
			last = now
			fn.apply(context, args)
		}
	}
}
```

## 防抖
防抖的中心思想在于：我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次。

我们对比 throttle 来理解 debounce：在throttle的逻辑里，“第一个人说了算”，它只为第一个乘客计时，时间到了就执行回调。而 debounce 认为，“最后一个人说了算”，debounce 会为每一个新乘客设定新的定时器。

```js
function debounce(fn, delay) {
	let timer = null
	return function () {
		let context = this
		let args = arguments
		timer && clearTimeout(timer)
		timer = setTimeout(function () {
			fn.apply(context, args)
		}, deloy)
	}
}
```

## 合体版本
```js
// fn是我们需要包装的事件回调, delay是时间间隔的阈值
function throttle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0, timer = null
  // 将throttle处理结果当作函数返回
  
  return function () { 
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()
    
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
    // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
       clearTimeout(timer)
       timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
    } else {
        // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
        last = now
        fn.apply(context, args)
    }
  }
}
```