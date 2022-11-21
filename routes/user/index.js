import express from 'express'
import { updatePoints, verifyCurrentPoints, verifyPreviousPoints } from '../../controllers/userPoints'
const router = express.Router()

/* GET users listing. */

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /user/updatePoints/:
 *      post:
 *          description: Update User Points
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - userId: User Unique Id
 *                description: Id Should be bytes32 type value
 *                required: true
 *                type: bytes32
 *              - score: User Points
 *                description: Current User Point to be updated
 *                required: true
 *                type: Number
 *              - timestamp: Time
 *                description: Time at which the Points is updated
 *                required: true
 *                type: Number
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.post('/updatePoints', updatePoints)

/**
  * @swagger
  *  components:
  *             securitySchemes:
  *              ApiKeyAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: X-API-KEY
  * /user/verifyCurrentPoints/:
  *      get:
  *          description: To verify the current User Points
  *
  *          security:
  *             - ApiKeyAuth: []
  *          parameters:
  *              - userId: User Unique Id
  *                description: Id Should be bytes32 type value
  *                required: true
  *                type: bytes32
  *              - score: User Points
  *                description:  User Point to be verified
  *                required: true
  *                type: Number
  *          responses:
  *              200:
  *                description: Success
  *
  */
router.get('/verifyCurrentPoints', verifyCurrentPoints)

/**
  * @swagger
  *  components:
  *             securitySchemes:
  *              ApiKeyAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: X-API-KEY
  * /user/verifyPreviousPoints/:
  *      get:
  *          description: To verify the any previous ESP score of Company
  *
  *          security:
  *             - ApiKeyAuth: []
  *          parameters:
  *              - userId: User Unique Id
  *                description: Id Should be bytes32 type value
  *                required: true
  *                type: bytes32
  *              - score: User Points
  *                description:  User Point to be verified
  *                required: true
  *                type: Number
  *              - timestamp: Time
  *                description: Time at which the Points is to be verified
  *                required: true
  *                type: Number
  *          responses:
  *              200:
  *                description: Success
  *
  */
router.get('/verifyPreviousPoints', verifyPreviousPoints)

export default router
