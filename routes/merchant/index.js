import express from 'express'
import account from './account.js'

const router = express.Router()

router.use('/account', account)

export default router
