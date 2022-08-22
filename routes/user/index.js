import express from 'express'
import { updatePoints, verifyCurrentPoints, verifyPreviousPoints } from '../../controllers/userPoints'
const router = express.Router()

/* GET users listing. */

router.post('/updatePoints', updatePoints)
router.get('/verifyCurrentPoints', verifyCurrentPoints)
router.get('/verifyPreviousPoints', verifyPreviousPoints)

export default router
