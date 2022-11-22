import express from 'express'
import { createSchedule, releaseFunds, revokeSchedule, totalScheduledAmount, totalSchedules, totalWithdrawableFunds, userScheduleCounts, userScheduleDetails, userScheduleReleasableFunds, withdrawFunds } from '../../controllers/vesting'
const router = express.Router()

//const port = process.env.port || 5000

// router.listen(port, () => {
//     console.log(`server listening on port ${port}`)
// })

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /create:
 *      post:
 *          description: create vesting schedule for tokens
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - name: address
 *                description: Metmask beneficiary Address of the User 
 *                required: true
 *                type: string
 *              - name: startTime
 *                description: start time of the vesting schedule
 *                required: true
 *                type: number
 *              - name: cliffTime
 *                description: cliff period in seconds
 *                required: true
 *                type: number
 *              - name: duration
 *                description: duration of vesting period in seconds
 *                required: true
 *                type: number
 *              - name: slicePeriod
 *                description: duration of slice period for the vesting in seconds
 *                required: true
 *                type: number
 *              - name: revocable
 *                description: whether or not the vesting is revocable
 *                required: true
 *                type: boolean
 *              - name: amount
 *                description: total amount of tokens to be released at the end of vesting
 *                required: true
 *                type: number           
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.post('/create', createSchedule)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /revoke:
 *      post:
 *          description: revoke vesting schedule
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - name: scheduledId
 *                description: bytes32 value 
 *                required: true
 *                type: string
 *              - name: releasable
 *                description: whether releasable or not
 *                required: true
 *                type: boolean
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.post('/revoke', revokeSchedule)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /withdraw:
 *      post:
 *          description: withdraw the specified amount if possible
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - name: amount
 *                description: withdrawable amount
 *                required: true
 *                type: number
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.post('/withdraw', withdrawFunds)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /release:
 *      post:
 *          description: release the specified amount if possible
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - name: scheduleId
 *                description: scheduled bytes32 Id
 *                required: true
 *                type: string
 *              - name: amount
 *                description: releasable amount if possible
 *                required: true
 *                type: number 
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.post('/release', releaseFunds)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /scheduleCounts:
 *      get:
 *          description: get vesting schedule count of beneficiary
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - name: address
 *                description: address of the beneficiary
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.get('/scheduleCounts', userScheduleCounts)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /scheduleReleasableFund:
 *      get:
 *          description: get releasable fund of beneficiary
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - name: address
 *                description: address of the beneficiary
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.get('/scheduleReleasableFund', userScheduleReleasableFunds)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /scheduleDetails:
 *      get:
 *          description: get schedule details of the beneficiary
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - name: address
 *                description: address of the beneficiary
 *                required: true
 *                type: string
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.get('/scheduleDetails', userScheduleDetails)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /totalSchedules:
 *      get:
 *          description: get total schedule count
 *
 *          security:
 *             - ApiKeyAuth: []
 *     
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.get('/totalSchedules', totalSchedules)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /totalWithdrawableFunds:
 *      get:
 *          description: get total withdrawable funds of the beneficiary
 *
 *          security:
 *             - ApiKeyAuth: []
 * 
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.get('/totalWithdrawableFunds', totalWithdrawableFunds)

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /totalScheduledAmount:
 *      get:
 *          description: get total withdrawable funds of the beneficiary
 *
 *          security:
 *             - ApiKeyAuth: []
 * 
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.get('/totalScheduledAmount', totalScheduledAmount)

export default router

