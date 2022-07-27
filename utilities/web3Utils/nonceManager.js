import { web3 } from './web3'
import logger from '../logger.js'
const NONCE = {}

const walletWalidator = (wallet) => {
  if (!wallet) throw Error('wallet not received')
  if (!web3.utils.isAddress(wallet)) throw Error('invalid address')
}

export const init = async (wallet) => {
  walletWalidator(wallet)
  NONCE[wallet] = await web3.eth.getTransactionCount(wallet, 'pending')
  setInterval(async () => {
    NONCE[wallet] = await web3.eth.getTransactionCount(wallet, 'pending')
    logger.debug('Current Admin Nounce: ' + NONCE[wallet])
  }, 60000)
}

export const updateNonce = (wallet) => {
  walletWalidator(wallet)
  NONCE[wallet]++
}

export const getNonce = async (wallet) => {
  walletWalidator(wallet)
  if (!NONCE[wallet]) await init(wallet)
  logger.debug('Nounce: ' + NONCE[wallet])
  return NONCE[wallet]++
}
