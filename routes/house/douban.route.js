import express from 'express'
import getHouseList from '../../controllers/house/douban.controller.js'
const router = express.Router()

/* GET daily list data. */
router.get('/douban', getHouseList)

export default router
