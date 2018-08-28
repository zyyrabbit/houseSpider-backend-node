import mysql from 'mysql2'
import { poolConfig } from '../config/db.js'
import { sqlEngine } from '../utils/utils.js'
const promisePool = mysql.createPool(poolConfig).promise()
class BaseDAO {
	// 插入数据
	async batchInsert(param) {
		let preSql = 'insert into {{tableName}} {{fields}} values ?'
		let preData = param.preData
		preData.fields = preData.fields ? '(' + preData.fields.join(',') + ')' : ''
		try {
			await promisePool.query(sqlEngine(preSql, param.preData), param.data)
		} catch (e) {
			console.error(e)
		}
	}

	// 删除数据
	async delete(param) {
		let preSql = 'delete from {{tableName}}'
		try {
			await promisePool.query(sqlEngine(preSql, param))
		} catch (e) {
			console.error(e)
		}
	}
}
export default new BaseDAO()
