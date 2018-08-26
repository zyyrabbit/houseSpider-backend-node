import { htmlStringGet } from '../../utils/httpRequest.js'
class Book {
	async getBookRankingList(req, res, next) {
		let params = {
			url: 'http://bang.dangdang.com/books'
		}
		try {
			let	$ = await htmlStringGet(params, 'gb2312')
			let contents = []
			$('#js_bestsellers .bang_index_intro').each(function() {
				let title = $(this)
					.find('a')
					.attr('title')
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
export default new Book()
