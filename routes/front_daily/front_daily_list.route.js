import express from 'express'
import FrontDaily from '../../controllers/front_daily/front_daily.controller.js'
const router = express.Router()

/* GET daily list data. */
router.get('/list', FrontDaily.getList)

export default router
