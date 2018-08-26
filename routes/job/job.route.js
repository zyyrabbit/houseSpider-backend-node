import express from 'express'
import Job from '../../controllers/job/job.controller.js'
const router = express.Router()

/* GET daily list data. */
router.get('/book_list/:city/:positionName/:pageNo', Job.getJobList)

export default router
