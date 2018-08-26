// 共同配置
const common = {
	static: './public'
}
// 开发环境配置
const development = {
	port: '3000',
	...common
}
// 生产环境配置
const production = {
	...common
}
export default process.env.NODE_ENV === 'development' ? development : production
