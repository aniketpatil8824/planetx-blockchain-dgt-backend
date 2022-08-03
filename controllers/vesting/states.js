import User from '../../database/user.js'
import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'

export const userScheduleCounts = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findOne({ username }).populate('wallet', 'address publicKey networkType').exec()

    responseUtils.response.successResponse(res, 'Account Details for Merchant', user)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const userScheduleAmount = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findOne({ username }).populate('wallet', 'address publicKey networkType').exec()

    responseUtils.response.successResponse(res, 'Account Details for Merchant', user)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const userScheduleReleasableFunds = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findOne({ username }).populate('wallet', 'address publicKey networkType').exec()

    responseUtils.response.successResponse(res, 'Account Details for Merchant', user)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const userScheduleDetails = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findOne({ username }).populate('wallet', 'address publicKey networkType').exec()

    responseUtils.response.successResponse(res, 'Account Details for Merchant', user)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const totalSchedules = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findOne({ username }).populate('wallet', 'address publicKey networkType').exec()

    responseUtils.response.successResponse(res, 'Account Details for Merchant', user)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const totalWithdrawableFunds = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findOne({ username }).populate('wallet', 'address publicKey networkType').exec()

    responseUtils.response.successResponse(res, 'Account Details for Merchant', user)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}
