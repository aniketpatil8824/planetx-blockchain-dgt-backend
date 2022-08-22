import axios from 'axios'
import config from '../../config'
import * as responseUtils from '../../utilities/responseUtils'
import Payout from '../../database/payouts.js'
import { v4 as uuid } from 'uuid'
import logger from '../../utilities/logger.js'

export const payout = async (req, res) => {
  const reciepientAddress = req.body.reciepientAddress
  const amount = req.body.amount

  try {
    if (!reciepientAddress || !amount) {
      return responseUtils.response.badRequestErrorResponse(res, 'All Fields Required')
    }
    const txId = uuid()
    const tx = new Payout({ _id: txId })
    await tx.save()
    await tx.setProcessing()

    console.log(tx)

    const configurationResponse = await axios.get('https://api-sandbox.circle.com/v1/configuration', {
      headers: {
        Authorization: `Bearer ${config.CIRCLE.API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    console.log(configurationResponse.data.data)

    const masterWalletId = configurationResponse.data.data.payments.masterWalletId
    console.log(masterWalletId)
    const data = JSON.stringify({
      source: {
        id: masterWalletId,
        type: 'wallet'
      },
      destination: {
        type: 'blockchain',
        address: reciepientAddress,
        chain: 'MATIC'
      },
      amount: {
        amount,
        currency: 'USD'
      },
      idempotencyKey: txId
    })

    axios.post('https://api-sandbox.circle.com/v1/transfers', data, {
      headers: {
        Authorization: `Bearer ${config.CIRCLE.API_KEY}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async function (response) {
        console.log(JSON.stringify(response.data))
        await tx.setSuccess()
      })
      .catch(function (error) {
        console.log(error)
      })
    responseUtils.response.successResponse(res, 'Payout Transaction sent and In Process', { txId })
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, err)
  }
}
