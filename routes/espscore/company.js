import express from 'express'
import { updateCompanyEsp, verifyCurrentEspScore, verifyPreviousEspScore } from '../../controllers/espscore'
const router = express.Router()

/* GET users listing. */
router.post('/updatePoints', updateCompanyEsp)
router.get('/verifyCurrentPoints', verifyCurrentEspScore)
router.get('/verifyPreviousPoints', verifyPreviousEspScore)

export default router
