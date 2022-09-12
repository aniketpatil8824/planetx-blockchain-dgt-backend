import express from 'express'
import { updatePoints, verifyCurrentPoints, verifyPreviousPoints } from '../../controllers/product'
const router = express.Router()

/* GET users listing. */
router.post('/updatePoints', updatePoints)
router.get('/verifyCurrentPoints', verifyCurrentPoints)
router.get('/verifyPreviousPoints', verifyPreviousPoints)

export default router
