import _Tx from '@ethereumjs/tx'
import { getAdminWallet } from './adminWalletManager.js'
import { web3 } from './web3'
import { getNonce } from './nonceManager.js'
import _Common, { Chain } from '@ethereumjs/common'

const Common = _Common.default
const Tx = _Tx.Transaction

export const createTx = async (txObject) => {
  const ADMIN_WALLET = await getAdminWallet()
  const adminAddress = ADMIN_WALLET.address
  const estGasPrice = await web3.eth.estimateGas({
    to: txObject.to,
    data: txObject.data,
    from: adminAddress
  })
  const nonceCount = await getNonce(adminAddress)
  const nonce = web3.utils.toHex(nonceCount)

  const chainId = await web3.eth.getChainId()
  const payload = {
    ...txObject,
    from: adminAddress,
    nonce,
    chainId: web3.utils.toHex(chainId),
    gasPrice: estGasPrice,
    gasLimit: 250000
  }
  // eslint-disable-next-line new-cap
  const privateKey = new Buffer.from(ADMIN_WALLET.privateKey.slice(2), 'hex')

  const common = new Common({ chain: Chain.Rinkeby })

  const tx = new Tx(payload, { common })

  const sign = tx.sign(privateKey)
  const serializedTx = sign.serialize()

  return '0x' + serializedTx.toString('hex')
}
