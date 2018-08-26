import express from 'express'
import Book from '../../controllers/book/dangdang.controller.js'
const router = express.Router()

/* GET daily list data. */
router.get('/book_rank', Book.getBookRankingList)

export default router
