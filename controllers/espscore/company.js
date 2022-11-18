import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import CompanyScores from '../../database/companyScore'
import { getRootandProof } from '../../utilities/web3Utils'
import { publiser } from '../../utilities/queueUtils'
import config from '../../config'
import { uuid } from 'uuidv4'
import Transaction from '../../database/transaction.js'

const createAccount = async (companyId, points) => {
  try {
    const newUser = new CompanyScores({
      companyId,
      points: [points]
    })
    const user = await newUser.save()
    logger.info({ user })
    return user
  } catch (err) {
    logger.error(err)
  }
}

const updateAccount = async (companyId, pointsArray, timestamp) => {
  const user = await CompanyScores.findOneAndUpdate({ companyId }, { points: pointsArray })
  if (user) {
    return await setTransaction(companyId, pointsArray, timestamp)
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

  await publiser(config.QUEUE.LIST.updateESP, { userId, root: setTree.rootHash, proof: setTree.hexProof, timestamp, txId, type: 'company' })

  return { txId }
}

export const updatePoints = async (req, res) => {
  try {
    const info = req.body
    const user = await CompanyScores.findOne({ companyId: info.companyId }).exec()
    if (!user) {
      const account = await createAccount(info.companyId, info.score)
      if (account) {
        const response = setTransaction(account.companyId, account.points, info.timestamp)
        responseUtils.response.successResponse(res, 'Successfully Updated', response)
      } else {
        responseUtils.response.serverErrorResponse(res, { Error: 'Could Not Create Account' })
      }
    } else {
      const pointsArray = user.points
      pointsArray.push(info.score)
      console.log(pointsArray)
      const updated = updateAccount(user.companyId, pointsArray, info.timestamp)
      if (updated) {
        logger.info(updated)
        const response = setTransaction(user.companyId, pointsArray, info.timestamp)
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
