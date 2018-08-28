import { htmlStringGet } from '../../utils/httpRequest.js'
export default class BaseController {
	async getHouseList(params) {
		let	$ = await htmlStringGet(params, 'gb2312')
	}
}
