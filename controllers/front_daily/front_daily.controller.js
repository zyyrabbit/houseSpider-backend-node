import { htmlStringGet } from '../../utils/httpRequest.js'
class FrontDaily {
	async getList(req, res, next) {
		let params = {
			url: 'http://caibaojian.com/c/news'
		}
		try {
			let	$ = await htmlStringGet(params)
			let contents = []
			$('#content article').each(function() {
				let title = $(this)
					.find('.entry-title span')
					.text()
				let tmp = {
					title
				}
				contents.push(tmp)
			})
			res.send({
				code: 200,
				data: contents
			})
		} catch (error) {
			res.send({
				code: 404,
				message: '网页找不到'
			})
		}
	}
}
export default new FrontDaily()
