import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import { getScheduleInfo, getScheduleReleasableAmount, getTotalScheduleAmount, getTotalSchedules, getTotalWithdrawableAmount, getUserSchedulesCount } from '../../services/vesting/getter.js'
import { generateScheduleId } from '../../utilities/web3Utils'

export const userScheduleCounts = async (req, res) => {
  try {
    const address = req.query.userId

    // need to be updated later, get index somehow or update id in database
    const scheduleId = generateScheduleId(address, 0)
    const response = getUserSchedulesCount(scheduleId)
    responseUtils.response.successResponse(res, 'Successfully Fetched', response)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const totalScheduledAmount = async (req, res) => {
  try {
    const response = getTotalScheduleAmount()
    responseUtils.response.successResponse(res, 'Successfully Fetched', response)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
  const response = getTotalScheduleAmount()
  responseUtils.response.successResponse(res, 'Successfully Fetched', response)
}

export const userScheduleReleasableFunds = async (req, res) => {
  try {
    const address = req.query.userId

    // need to be updated later, get index somehow or update id in database
    const scheduleId = generateScheduleId(address, 0)
    const response = getScheduleReleasableAmount(scheduleId)
    responseUtils.response.successResponse(res, 'Successfully Fetched', response)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const userScheduleDetails = async (req, res) => {
  try {
    const address = req.query.userId

    // need to be updated later, get index somehow or update id in database
    const scheduleId = generateScheduleId(address, 0)
    const response = getScheduleInfo(scheduleId)
    responseUtils.response.successResponse(res, 'Successfully Fetched', response)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const totalSchedules = async (req, res) => {
  try {
    const response = getTotalSchedules()
    responseUtils.response.successResponse(res, 'Successfully Fetched', response)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const totalWithdrawableFunds = async (req, res) => {
  try {
    const response = getTotalWithdrawableAmount()
    responseUtils.response.successResponse(res, 'Successfully Fetched', response)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}
