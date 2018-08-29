import { htmlStringGet } from '../../utils/httpRequest.js'
import BaseDAO from '../../model/dbConnection.js'
import { dataFormat } from '../../utils/utils.js'
import { doubanUrls } from '../../utils/addressMap.js'
import mapLimit from 'async/mapLimit'
	// 根据设置的页数生成相应链接
	function generateUrls(pageNo = 1, pageSize = 25) {
		let pageNos = []
		pageNo = parseFloat(pageNo)
		if (isNaN(pageNo) || pageNo < 0 || pageNo > 100) {
			console.error('页数格式不正确或者范围不正确！')
			return pageNos
		}
		let i = -1
		while (++i < pageNo) {
			pageNos.push(i * 25)
		}
		return pageNos
	}

	function filterDataByKeywords(title, keywords) {
		// 只有当关键字存在才检测
		return !keywords || keywords.some(keyword => {
			return new RegExp(`${keyword}`).test(title)
		})
	}

	// 爬指定单页面数据
	async function fetchData(params, callback) {
		console.time('  耗时')
		let	$ = await htmlStringGet({
			url: params.url
		}, 'utf-8')
		let contents = []
		$('#content .olt tr').each(function() {
			let info = $(this)
			// 标题
			let a = info.find('.title a')
			// 获取标题
			let title = a.attr('title') + ''
			// 获取链接
			let url = a.attr('href')
			// 获取价格
			let price = title.match(/\d{3,}/)
			price = price ? +price[0] : 100000
			// 获取发布时间以及数据格式化
			let time = dataFormat(info.find('.time').text())
			let data = [
				title,
				url,
				price, // 默认取值
				time
			]
			if (url && filterDataByKeywords(title, params.keywords)) {
				contents.push(data)
			}
		})
		// 触发数据回调
		callback(null, contents)
	}

	export default async function getHouseList(req, res, next) {
		// 收集的数据页数
		let { pageNo, positionCity = 'default', keywords } = req.query
		// 处理查询关键字
		if (keywords) {
			keywords = Array.isArray(keywords) ? [...new Set(keywords)] : [keywords]
		}
		let baseUrl = doubanUrls[positionCity] + 'discussion?start='
		// 请求页数
		let pageNos = generateUrls(pageNo)
		// 控制并发
		mapLimit(pageNos, 10, async (pageNo, callback) => {
			await fetchData({
				url: baseUrl + pageNo,
				keywords
			}, callback)
			console.timeEnd('  耗时')
		}, async (err, result) => {
			if (err) {
				console.error(err)
			}
			let data = result.reduce((pre, cur) => pre.concat(cur), [])
			// 如果结果集为空，则不删除
			if (data.length === 0) {
				res.send({
					code: 200,
					data: []
				})
				return
			}
			// 每次插入之前先删除
			await BaseDAO.delete({
				tableName: 'douban'
			})
			// 批量插入数据
			await BaseDAO.batchInsert({
				preData: {
					tableName: 'douban',
					fields: ['title', 'url', 'price', 'time']
				},
				data: [data] // 很奇怪和文档不符合，不知道为什么加外面还要加一层[]
			})
			res.send({
				code: 200,
				data: data
			})
		})
	}
