import express from 'express'
import { updateProductEsp, verifyCurrentEspScore, verifyPreviousEspScore } from '../../controllers/espscore'
const router = express.Router()

/* GET users listing. */
router.post('/updatePoints', updateProductEsp)
router.get('/verifyCurrentPoints', verifyCurrentEspScore)
router.get('/verifyPreviousPoints', verifyPreviousEspScore)

export default router
