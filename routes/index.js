// 路由配置
import book from './book/dangdang.route.js'
import house from './house/douban.route.js'
export default app => {
	app.use('/book', book)
	app.use('/house', house)
}
