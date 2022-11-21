import express from 'express'
import { updateProductEsp, verifyCurrentEspScore, verifyPreviousEspScore } from '../../controllers/espscore'
const router = express.Router()

/* GET users listing. */

/* GET users listing. */

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /espscore/product/updatePoints/:
 *      post:
 *          description: Update Product ESPScore
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - companyId: Product Unique Id
 *                description: Id Should be bytes32 type value
 *                required: true
 *                type: bytes32
 *              - score: Esp score
 *                description: Current ESP score to be updated
 *                required: true
 *                type: Number
 *              - timestamp: Time
 *                description: Time at which the score is updated
 *                required: true
 *                type: Number
 *          responses:
 *              200:
 *                description: Success
 *
 */
router.post('/updatePoints', updateProductEsp)

/**
  * @swagger
  *  components:
  *             securitySchemes:
  *              ApiKeyAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: X-API-KEY
  * /espscore/product/verifyCurrentPoints/:
  *      get:
  *          description: To verify the current ESP score of Product
  *
  *          security:
  *             - ApiKeyAuth: []
  *          parameters:
  *              - companyId: Product Unique Id
  *                description: Id Should be bytes32 type value
  *                required: true
  *                type: bytes32
  *              - score: Esp score
  *                description:  ESP score to be verified
  *                required: true
  *                type: Number
  *          responses:
  *              200:
  *                description: Success
  *
  */
router.get('/verifyCurrentPoints', verifyCurrentEspScore)

/**
  * @swagger
  *  components:
  *             securitySchemes:
  *              ApiKeyAuth:
  *                 type: apiKey
  *                 in: header
  *                 name: X-API-KEY
  * /espscore/product/verifyPreviousPoints/:
  *      get:
  *          description: To verify the any previous ESP score of Product
  *
  *          security:
  *             - ApiKeyAuth: []
  *          parameters:
  *              - companyId: Product Unique Id
  *                description: Id Should be bytes32 type value
  *                required: true
  *                type: bytes32
  *              - score: Esp score
  *                description:  ESP score to be verified
  *                required: true
  *                type: Number
  *              - timestamp: Time
  *                description: Time at which the score is to be verified
  *                required: true
  *                type: Number
  *          responses:
  *              200:
  *                description: Success
  *
  */
router.get('/verifyPreviousPoints', verifyPreviousEspScore)

export default router
