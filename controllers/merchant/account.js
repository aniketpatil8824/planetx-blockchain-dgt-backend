import User from '../../database/user.js'
import Wallet from '../../database/wallet.js'
import { createWallet } from '../../utilities/walletUtils'
import config from '../../config'
import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'

export const createAccount = async (req, res) => {
  try {
    const username = req.body.username
    const newWalletData = await createWallet()

    const wallet = new Wallet({
      address: newWalletData.address,
      publicKey: newWalletData.publicKey,
      encryptedWalletJson: newWalletData.encryptedWalletJson,
      networkType: config.DB_CONSTANTS.NETWORK_TYPES.EDGE
    })

    await wallet.save()

    const newUser = new User({
      username,
      role: config.DB_CONSTANTS.USER.ROLE.MERCHANT,
      status: config.DB_CONSTANTS.USER.STATUS.ACTIVE,
      wallet: [wallet._id]
    })

    await newUser.save()

    responseUtils.response.successResponse(res, 'Account Created', newUser)
  } catch (err) {
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}

export const getAccount = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.findOne({ username }).populate('wallet', 'address publicKey networkType').exec()

    responseUtils.response.successResponse(res, 'Account Details', user)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}
