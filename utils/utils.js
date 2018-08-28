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
const yearRg = /^[1-9]\d{3}([^\d+])/
// 时间格式化
export function dataFormat(date, fmt) {
    if (date == null) return ''
    // 如果为字符串，且没有添加年份则自动补全
    if (typeof date === 'string' && !yearRg.test(date)) {
		date = new Date().getFullYear() + '-' + date
    }
    if (!(date instanceof Date)) {
        date = new Date(date)
        if (date.toString() === 'Invalid Date') {
            return '无效时间戳'
        }
    }
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

// 简单正则引擎
export const sqlEngine = function(sqlStr, data) {
    if (typeof data !== 'object') {
        return ''
    }
    return sqlStr.replace(/\{\{(.*?)\}\}/g, (match, key) => data[key.trim()])
}
