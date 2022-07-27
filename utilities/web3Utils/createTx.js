import Tx from '@ethereumjs/tx'
import { getAdminWallet } from './adminWalletManager.js'
import { web3 } from './web3'
import { getNonce } from './nonceManager.js'
import Common, { Chain, Hardfork } from '@ethereumjs/common'
import config from '../../config'
import logger from '../logger.js'

const customChainParams = { name: 'rinkeby', chainId: 111, networkId: 111 }

export const createTx = async (txObject) => {
  const ADMIN_WALLET = await getAdminWallet()
  const adminAddress = ADMIN_WALLET.address

  txObject.from = adminAddress

  const gasPrice = await web3.eth.getGasPrice()
  txObject.gasPrice = web3.utils.toHex(gasPrice)

  const nonceCount = await getNonce(adminAddress)
  txObject.nonce = web3.utils.toHex(nonceCount)

  // eslint-disable-next-line new-cap
  const privateKey = new Buffer.from(ADMIN_WALLET.privateKey.slice(2), 'hex')

  const common = new Common({ chain: Chain.Rinkeby, hardfork: Hardfork.Istanbul })
  logger.info({ ourprivate: privateKey, config: config.PRIVATE_KEYS.admin, txObject, common })

  const tx = new Tx(txObject, { common })

  tx.sign(privateKey)
  const serializedTx = tx.serialize()

  return '0x' + serializedTx.toString('hex')
}
