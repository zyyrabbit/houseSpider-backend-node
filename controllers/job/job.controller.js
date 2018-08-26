import { httpGet } from '../../utils/httpRequest.js'
import { objPathParse } from '../../utils/utils.js'

class Job {
	async getJobList(req, res) {
		let city = encodeURIComponent(req.params.city)
		let positionName = encodeURIComponent(req.params.positionName)
		let pageNo = req.params.pageNo
		let url = `https://m.lagou.com/search.json?city=${city}&positionName=${positionName}&pageSize=15`
		try {
			let data = []
			for (let i = pageNo; i < 80; i++) {
				console.log(`-------------------${i}----start--------------`)
				let params = {
					url: url + `&pageNo=${i}`
				}
				let body = await httpGet(params)
				let contents = objPathParse(JSON.parse(body), 'content.data.page.result')
				contents.forEach(val => {
					data.push({
						compantName: val.companyName,
						salary: val.salary
					})
				})
				console.log(`-------------------${i}------end------------`)
			}
			res.send({
				code: 200,
				data
			})
		} catch (error) {
			console.log(error)
			res.send({
				code: 404,
				message: '页面找不到'
			})
		}
	}
}
export default new Job()
