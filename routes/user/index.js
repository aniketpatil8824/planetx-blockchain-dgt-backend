import express from 'express'
import { updatePoints, verifyCurrentPoints } from '../../controllers/user'
const router = express.Router()

/* GET users listing. */
router.post('/updatePoints', updatePoints)
router.get('/verifyCurrentPoints', verifyCurrentPoints)
router.get('/verifyPreviousPoints', verifyCurrentPoints)

export default router
