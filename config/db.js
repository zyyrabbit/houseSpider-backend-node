let baseDbConfig = {
	host: '127.0.0.1',
	port: '3306',
	database: 'house',
	user: 'root',
	password: 'mysql520zyy'
}
// 连接池配置
export const poolConfig = {
	...baseDbConfig,
	connectionLimit: 10
}
export default baseDbConfig
