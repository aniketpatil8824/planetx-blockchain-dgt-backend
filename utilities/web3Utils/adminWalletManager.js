import ethers from 'ethers'
import config from '../../config'
// const { logger } = require('../../utilities/logger')

export const getAdminWallet = async () => {
  const wallet = new ethers.Wallet(config.BNB.ACCOUNTS.ADMIN.PRIVATE_KEY)
  // logger.log(wallet.address)
  return wallet
}

// logger.log( module.exports.getAdminWallet().privateKey);
