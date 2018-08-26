// 对象列表遍历
export function objForEach(obj, fn) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			fn(obj[key], key, obj)
		}
	}
}
// 对象路径解析
export function objPathParse(obj, pathStr) {
	let paths = pathStr.split('.')
	let rst = paths.reduce((pre, key) => {
		return pre[key]
	}, obj)
	return rst
}
// 节流函数
export function throttle(fn, intervalTime) {
	let startTime = new Date().getTime()
	return function(...args) {
		let nowTime = new Date().getTime()
		if (nowTime - startTime > intervalTime) {
			fn.apply(null, args)
			startTime = nowTime
		}
	}
}
