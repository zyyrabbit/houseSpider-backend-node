// 路由配置
import frontDaily from './front_daily/front_daily_list.route.js'
import book from './book/dangdang.route.js'
import job from './job/job.route.js'
export default app => {
	app.use('/book', book)
	app.use('/daily', frontDaily)
	app.use('/job', job)
}
