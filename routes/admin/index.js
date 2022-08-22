import express from 'express'
import account from './account.js'
import payout from './payout.js'

const router = express.Router()

router.use('/account', account)
router.use('/payout', payout)

export default router
