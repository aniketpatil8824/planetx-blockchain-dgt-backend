import express from 'express'
import { signingData, signatureVerify } from '../../controllers/auth'
const router = express.Router()

/* GET users listing. */
router.post('/signingdata', signingData)
router.post('/verifysignature', signatureVerify)

export default router
