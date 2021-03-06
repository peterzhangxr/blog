# JS事件委托
事件委托，通俗地来讲，就是把一个元素响应事件（click、keydown......）的函数委托到另一个元素；

一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。

举个例子，比如一个宿舍的同学同时快递到了，一种方法就是他们都傻傻地一个个去领取，还有一种方法就是把这件事情委托给宿舍长，让一个人出去拿好所有快递，然后再根据收件人一一分发给每个宿舍同学；

在这里，取快递就是一个事件，每个同学指的是需要响应事件的 DOM 元素，而出去统一领取快递的宿舍长就是代理的元素，所以真正绑定事件的是这个元素，按照收件人分发快递的过程就是在事件执行中，需要判断当前响应的事件应该匹配到被代理元素中的哪一个或者哪几个。

```html
<div class="node1" onclick="console.log('node1')">
	<div class="node2" onclick="console.log('node2')">
		<div class="node3" onclick="console.log('node3')"></div>
	</div>
</div>
点击node3，打印如下：
node3
node2
node1
```
```html
<div class="node1" onclick="console.log('node1')">
	<div class="node2">
		<div class="node3"></div>
	</div>
</div>
点击node3，打印如下
node1
```
## 事件模型
* 捕获阶段：在事件冒泡的模型中，捕获阶段不会响应任何事件；
* 目标阶段：目标阶段就是指事件响应到触发事件的最底层元素上；
* 冒泡阶段：冒泡阶段就是事件的触发响应会从最底层目标一层层地向外到最外层（根节点），事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

## 委托的优点
* 1.减少内存消耗
* 2.动态绑定事件

## 局限性
* 比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；
* mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；