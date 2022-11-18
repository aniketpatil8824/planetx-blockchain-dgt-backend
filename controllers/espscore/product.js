import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import ProductScores from '../../database/productScore'
import { getRootandProof } from '../../utilities/web3Utils'
import { publiser } from '../../utilities/queueUtils'
import config from '../../config'
import { uuid } from 'uuidv4'
import Transaction from '../../database/transaction.js'

const createAccount = async (productId, points) => {
  try {
    const newUser = new ProductScores({
      productId,
      points: [points]
    })
    const user = await newUser.save()
    logger.info({ user })
    return user
  } catch (err) {
    logger.error(err)
  }
}

const updateAccount = async (productId, pointsArray, timestamp) => {
  const user = await ProductScores.findOneAndUpdate({ productId }, { points: pointsArray })
  if (user) {
    return await setTransaction(productId, pointsArray, timestamp)
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
  const tx = new Transaction({ _id: txId, type: 'UPDATE_PRODUCT_ESP' })
  await tx.save()
  await tx.setProcessing()

  await publiser(config.QUEUE.LIST.updateESP, { userId, root: setTree.rootHash, proof: setTree.hexProof, timestamp, txId, type: 'product' })

  return { txId }
}

export const updatePoints = async (req, res) => {
  try {
    const info = req.body
    const user = await ProductScores.findOne({ productId: info.productId }).exec()
    if (!user) {
      const account = await createAccount(info.productId, info.score)
      if (account) {
        const response = setTransaction(account.productId, account.points, info.timestamp)
        responseUtils.response.successResponse(res, 'Successfully Updated', response)
      } else {
        responseUtils.response.serverErrorResponse(res, { Error: 'Could Not Create Account' })
      }
    } else {
      const pointsArray = user.points
      pointsArray.push(info.score)
      console.log(pointsArray)
      const updated = updateAccount(user.productId, pointsArray, info.timestamp)
      if (updated) {
        logger.info(updated)
        const response = setTransaction(user.productId, pointsArray, info.timestamp)
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
