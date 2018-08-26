import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import router from './routes'
import config from './config'

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, config.static)))
// 跨域设置
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.Origin || req.headers.origin || 'https://cangdu.org')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Credentials', true) // 可以带cookies
	res.header('X-Powered-By', '3.2.1')
	if (req.method === 'OPTIONS') {
		res.send(200)
	} else {
		next()
	}
})
// 路由设置
router(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
