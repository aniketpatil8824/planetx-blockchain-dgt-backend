import express from 'express'
import { signingData, signatureVerify } from '../../controllers/auth'
const router = express.Router()

/* GET users listing. */
router.get('/signingdata', signingData)
router.get('/verifysignature', signatureVerify)

export default router
