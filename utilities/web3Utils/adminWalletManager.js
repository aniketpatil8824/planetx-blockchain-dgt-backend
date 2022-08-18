import ethers from 'ethers'
import config from '../../config'
import logger from '../logger'

export const getAdminWallet = async () => {
  const wallet = new ethers.Wallet(config.PRIVATE_KEYS.deployer)
  logger.info(wallet)
  return wallet
}
