import express from 'express'
import { payout } from '../../controllers/circlePayout'

const router = express.Router()

/**
 * @swagger
 *  components:
 *             securitySchemes:
 *              ApiKeyAuth:
 *                 type: apiKey
 *                 in: header
 *                 name: X-API-KEY
 * /admin/payout/:
 *      post:
 *          description: Payout USDC to a Address using circle
 *
 *          security:
 *             - ApiKeyAuth: []
 *          parameters:
 *              - name: reciepientAddress
 *                description: Metmask Address of User to whom payout is to be done
 *                required: true
 *                type: string
 *              - name: amount
 *                description: "amount in usdc to be sent"
 *                required: true
 *                type: Number
 *          responses:
 *              200:
 *                description: Success
 *
 */

router.post('/', payout)

export default router
