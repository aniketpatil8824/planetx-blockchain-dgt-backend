import _Tx from '@ethereumjs/tx'
import { getAdminWallet } from './adminWalletManager.js'
import { web3 } from './web3'
import { getNonce } from './nonceManager.js'
import _Common, { Chain } from '@ethereumjs/common'

// const Common = _Common.default
const chain = _Common.default.forCustomChain(
  'mainnet', {
    name: 'polygon',
    networkId: 80001,
    chainId: 80001
  },
  'petersburg'
)
const Tx = _Tx.Transaction

export const createTx = async (txObject) => {
  console.log(txObject)
  console.log('hello')

  const ADMIN_WALLET = await getAdminWallet()
  const adminAddress = ADMIN_WALLET.address
  console.log('hello')

  const gas = await web3.eth.estimateGas({
    to: txObject.to,
    data: txObject.data,
    from: adminAddress
  })
  console.log('hello3')

  const nonceCount = await getNonce(adminAddress)
  const nonce = web3.utils.toHex(nonceCount)
  console.log('hello')

  const chainId = await web3.eth.getChainId()
  console.log(chainId)
  const payload = {
    ...txObject,
    from: adminAddress,
    nonce,
    chainId: web3.utils.toHex(chainId),
    gasPrice: web3.utils.toHex(1000000000),
    gasLimit: gas || web3.utils.toHex(250000)
  }
  // eslint-disable-next-line new-cap
  const privateKey = new Buffer.from(ADMIN_WALLET.privateKey.slice(2), 'hex')

  // const common = new Common({ chain: Chain.Goerli })

  const tx = new Tx(payload, { common: chain })

  const sign = tx.sign(privateKey)
  const serializedTx = sign.serialize()

  return '0x' + serializedTx.toString('hex')
}
