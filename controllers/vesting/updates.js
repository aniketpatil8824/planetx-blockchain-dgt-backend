import config from '../../config'
import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import { uuid } from 'uuidv4'
import Transaction from '../../database/transaction.js'
import { publiser } from '../../utilities/queueUtils/index.js'
import { generateScheduleId } from '../../utilities/web3Utils/hash.js'

export const createSchedule = async (req, res) => {
  try {
    const address = req.body.address
    const startTime = req.body.startTime // to be the timestamp
    const cliffTime = req.body.cliffTime // seconds
    const duration = req.body.duration // seconds
    const slicePeriod = req.body.slicePeriod
    const revocable = req.body.revocable // boolean
    const amount = req.body.amount // in wei

    const txId = uuid()
    const tx = new Transaction({ _id: txId, type: 'CREATE_SCHEDULE' })
    await tx.save()
    await tx.setProcessing()

    await publiser(config.QUEUE.LIST.createSchedule, { address, startTime, cliffTime, duration, slicePeriod, revocable, amount, txId })

    responseUtils.response.successResponse(res, 'Successfully Created Schedule', { txId })
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, err)
  }
}

export const revokeSchedule = async (req, res) => {
  try {
    const address = req.body.address
    const releasable = req.body.releasable // boolean
    // need to be updated later, get index somehow or update id in database
    const scheduleId = generateScheduleId(address, 0)

    const txId = uuid()
    const tx = new Transaction({ _id: txId, type: 'REVOKE_SCHEDULE' })
    await tx.save()
    await tx.setProcessing()

    await publiser(config.QUEUE.LIST.revokeSchedule, { scheduleId, releasable, txId })

    responseUtils.response.successResponse(res, 'Successfully Revoked', { txId })
  } catch (err) {
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const withdrawFunds = async (req, res) => {
  try {
    const amount = req.body.amount // in wei

    const txId = uuid()
    const tx = new Transaction({ _id: txId, type: 'WITHDRAW_FUNDS' })
    await tx.save()
    await tx.setProcessing()

    await publiser(config.QUEUE.LIST.withdrawFunds, { amount, txId })
    responseUtils.response.successResponse(res, 'Successfully Withdraw Funds', { txId })
  } catch (err) {
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const releaseFunds = async (req, res) => {
  try {
    const address = req.body.username
    // need to be updated later, get index somehow or update id in database
    const scheduleId = generateScheduleId(address, 0)
    const amount = req.body.amount // in wei

    const txId = uuid()
    const tx = new Transaction({ _id: txId, type: 'RELEASE_FUNDS' })
    await tx.save()
    await tx.setProcessing()

    await publiser(config.QUEUE.LIST.releaseFunds, { scheduleId, amount, txId })

    responseUtils.response.successResponse(res, 'Successfully Released Funds', { txId })
  } catch (err) {
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}
