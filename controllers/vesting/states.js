import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import { getScheduleInfo, getScheduleReleasableAmount, getTotalScheduleAmount, getTotalSchedules, getTotalWithdrawableAmount, getUserSchedulesCount } from '../../services/vesting/getter.js'

export const userScheduleCounts = async (req, res) => {
  try {
    const userId = req.query.userId
    const response = getUserSchedulesCount(userId)
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
    const userId = req.query.userId
    const response = getScheduleReleasableAmount(userId)
    responseUtils.response.successResponse(res, 'Successfully Fetched', response)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const userScheduleDetails = async (req, res) => {
  try {
    const userId = req.query.userId
    const response = getScheduleInfo(userId)
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
