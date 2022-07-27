import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import UserPoints from '../../database/userPoints.js'
import { createTx, generateId, getAdminWallet } from '../../utilities/web3Utils'

const createAccount = async (username) => {
  try {
    const userId = generateId(username)
    const newUser = new UserPoints({
      username,
      userId,
      points: [0]
    })
    const user = await newUser.save()
    return user
  } catch (err) {
    logger.error(err)
  }
}

export const updatePoints = async (req, res) => {
  try {
    const info = req.body
    const user = await UserPoints.findOne({ username: info.username }).exec()
    console.log(user)
    if (!user) {
      const account = await createAccount(info.username)
      logger.info(account)
      responseUtils.response.successResponse(res, 'Save Data', { signingData: account })
    } else {
      responseUtils.response.successResponse(res, 'Goty Data', { signingData: user })
    }
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, err)
  }
}

export const verifyCurrentPoints = async (req, res) => {
  const ress = await getAdminWallet()
  const txObject = {
    to: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    value: '0x'
  }
  const txSerialized = await createTx(txObject)
  logger.info({ txSerialized })
  responseUtils.response.successResponse(res, 'Verification Successful', { response: txSerialized })
}
