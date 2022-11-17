import express from 'express'
import { createAccount, getAccount } from '../../controllers/admin'

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
router.get('/', getAccount)

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
router.post('/create', createAccount)

export default router
