import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import UserPoints from '../../database/userPoints.js'
import { generateId, getRootandProof } from '../../utilities/web3Utils'
import { verifyCurrent, verifyPrevious } from '../../services/dgtpoints/verifyPoints'
import { publiser } from '../../utilities/queueUtils'
import config from '../../config'

const createAccount = async (username, points) => {
  try {
    const userId = generateId(username)
    const newUser = new UserPoints({
      username,
      userId,
      points: [points]
    })
    const user = await newUser.save()
    logger.info({ user })
    return user
  } catch (err) {
    logger.error(err)
  }
}

const updateAccount = async (userId, pointsArray, timestamp) => {
  const user = await UserPoints.findOneAndUpdate({ userId }, { points: pointsArray })
  if (user) {
    return await setTransaction(userId, pointsArray, timestamp)
  } else {
    return {
      status: 400,
      message: 'Error'
    }
  }
}

const setTransaction = async (userId, pointsArray, timestamp) => {
  const index = pointsArray.length - 1
  const setTree = getRootandProof(pointsArray, index)
  const payload = {
    userId,
    root: setTree.rootHash,
    proof: setTree.hexProof,
    timestamp
  }
  logger.info({ payload })
  await publiser(config.QUEUE.LIST.DGT, payload)
  return { response: 'Successfully updated the points' }
}

export const updatePoints = async (req, res) => {
  try {
    const info = req.body
    const user = await UserPoints.findOne({ username: info.username }).exec()
    if (!user) {
      const account = await createAccount(info.username, info.score)
      if (account) {
        const response = setTransaction(account.userId, account.points, info.timestamp)
        responseUtils.response.successResponse(res, 'Goty Data', { signingData: response })
      } else {
        responseUtils.response.serverErrorResponse(res, { Error: 'Could Not Create Account' })
      }
    } else {
      const pointsArray = user.points
      pointsArray.push(info.score)
      console.log(pointsArray)
      const updated = updateAccount(user.userId, pointsArray, info.timestamp)
      if (updated) {
        logger.info(updated)
        const response = setTransaction(user.userId, pointsArray, info.timestamp)
        responseUtils.response.successResponse(res, 'new Data', { signingData: response })
      } else {
        responseUtils.response.serverErrorResponse(res, { Error: 'Something went wrong' })
      }
    }
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, err)
  }
}

export const verifyCurrentPoints = async (req, res) => {
  const userName = req.query.user
  const score = req.query.score
  const user = await UserPoints.findOne({ username: userName }).exec()
  if (user) {
    console.log({ user })
    const response = verifyCurrent(user.userId, score)
    responseUtils.response.successResponse(res, 'Verification Completed', { response })
  } else {
    responseUtils.response.serverErrorResponse(res, ' User Information Not Found', { Error: 'User Not Found' })
  }
}

export const verifyPreviousPoints = async (req, res) => {
  const userName = req.query.user
  const score = req.query.score
  const timestamp = req.query.time
  const user = await UserPoints.findOne({ username: userName }).exec()
  if (user) {
    console.log({ user })
    const response = verifyPrevious(user.userId, timestamp, score)
    responseUtils.response.successResponse(res, 'Verification Completed', { response })
  } else {
    responseUtils.response.serverErrorResponse(res, ' User Information Not Found', { Error: 'User Not Found' })
  }
}
