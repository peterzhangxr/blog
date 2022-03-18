
function deepClone (origin, target) {
	var newTarget = target || {}
	for (var key in origin) {
		if (origin.hasOwnProperty(key)) {
			if (typeof origin[key] === 'object' && origin[key] !== null) {
				newTarget[key] = Object.prototype.toString.call(origin[key]) === '[object Array]' ? [] : {}
				deepClone(origin[key], newTarget[key])
			} else {
				newTarget[key] = origin[key]
			}
		}
	}

	return newTarget
}

var obj = {
	name: 1,
	items: {
		a: 1,
		b: [{
			value: {
				a: [1]
			}
		}]
	}
}

var obj2 = Object.assign({}, obj)
obj2.items.b[0].value.a = [2]
var b = {
	name: 2
}
var obj3 = deepClone(obj, b)
obj3.items.b[0].value.a = [3]
console.log(JSON.stringify(obj))
console.log(JSON.stringify(obj2))
console.log(JSON.stringify(obj3))
console.log(JSON.stringify(b))