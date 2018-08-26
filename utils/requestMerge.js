import { objForEach } from './utils.js'
import querystring from 'querystring'

const strategies = {
	data: (origin, target, key) => {
		origin[key] = querystring.stringify(target[key])
	},
	defaultStrategy: (origin, target, key) => {
		origin[key] = target[key]
	},
	headers: (origin, target, key) => {
		let orginHeaders = origin[key]
		objForEach(target[key], (value, key) => {
			orginHeaders[key] = value
		})
	}
}
// 合并函数
export default function(origin, target) {
	if (typeof origin !== 'object' || typeof target !== 'object') {
		return
	}
	objForEach(target, (value, key) => {
		let merge = strategies[key] ? strategies[key] : strategies['defaultStrategy']
		merge(origin, target, key)
	})
}
