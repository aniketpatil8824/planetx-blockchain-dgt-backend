import express from 'express'
import { createSchedule, releaseFunds, revokeSchedule, totalScheduledAmount, totalSchedules, totalWithdrawableFunds, userScheduleCounts, userScheduleDetails, userScheduleReleasableFunds, withdrawFunds } from '../../controllers/vesting'
const router = express.Router()

router.post('/create', createSchedule)
router.get('/revoke', revokeSchedule)
router.get('/withdraw', withdrawFunds)
router.get('/release', releaseFunds)

router.get('/scheduleCounts', userScheduleCounts)
router.get('/scheduleReleasableFund', userScheduleReleasableFunds)
router.get('/scheduleDetails', userScheduleDetails)
router.get('/totalSchedules', totalSchedules)
router.get('/totalWithdrawableFunds', totalWithdrawableFunds)
router.get('/totalScheduledAmount', totalScheduledAmount)

export default router
