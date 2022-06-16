import express from 'express'
import { createAccount, getAccount } from '../../controllers/merchant'

const router = express.Router()

router.get('/', getAccount)
router.post('/create', createAccount)

export default router
