import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import UserPoints from '../../database/userPoints.js'
import { createTx, generateId, getRootandProof } from '../../utilities/web3Utils'
import { updateUserPoints } from '../../services/dgtpoints/updatePoints'

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

const updateRequest = async (userId, pointsArray, timestamp) => {
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
  const sendTransaction = await updateUserPoints(payload)
  return sendTransaction
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
      const updated = updateRequest(user.userId, pointsArray, info.timestamp)
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
  const txObject = {
    to: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    value: '0x'
  }
  const txSerialized = await createTx(txObject)
  logger.info({ txSerialized })
  responseUtils.response.successResponse(res, 'Verification Successful', { response: txSerialized })
}
