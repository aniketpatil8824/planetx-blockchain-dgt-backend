import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import CompanyScores from '../../database/companyScore'
import { generateId, getRootandProof } from '../../utilities/web3Utils'
import { publiser } from '../../utilities/queueUtils'
import config from '../../config'
import { uuid } from 'uuidv4'
import Transaction from '../../database/transaction.js'
import { verifyCurrentCompanyESP, verifyPreviousCompanyESP } from '../../services/companyScore'

const createAccount = async (username, points) => {
  try {
    const userId = generateId(username)
    const newUser = new CompanyScores({
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
  const user = await CompanyScores.findOneAndUpdate({ userId }, { points: pointsArray })
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

  const txId = uuid()
  const tx = new Transaction({ _id: txId, type: 'UPDATE_COMPANY_ESP' })
  await tx.save()
  await tx.setProcessing()

  await publiser(config.QUEUE.LIST.updateCompanyESP, { userId, root: setTree.rootHash, proof: setTree.hexProof, timestamp, txId })

  return { txId }
}

export const updatePoints = async (req, res) => {
  try {
    const info = req.body
    const user = await CompanyScores.findOne({ username: info.username }).exec()
    if (!user) {
      const account = await createAccount(info.username, info.score)
      if (account) {
        const response = setTransaction(account.userId, account.points, info.timestamp)
        responseUtils.response.successResponse(res, 'Successfully Updated', response)
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
        responseUtils.response.successResponse(res, 'Successfully Updated', response)
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
  const user = await CompanyScores.findOne({ username: userName }).exec()
  if (user) {
    console.log({ user })
    const response = await verifyCurrentCompanyESP(user.userId, score)
    responseUtils.response.successResponse(res, 'Verification Completed', { response })
  } else {
    responseUtils.response.serverErrorResponse(res, ' User Information Not Found', { Error: 'User Not Found' })
  }
}

export const verifyPreviousPoints = async (req, res) => {
  const userName = req.query.user
  const score = req.query.score
  const timestamp = req.query.time
  const user = await CompanyScores.findOne({ username: userName }).exec()
  if (user) {
    console.log({ user })
    const response = await verifyPreviousCompanyESP(user.userId, timestamp, score)
    responseUtils.response.successResponse(res, 'Verification Completed', { response })
  } else {
    responseUtils.response.serverErrorResponse(res, ' User Information Not Found', { Error: 'User Not Found' })
  }
}
