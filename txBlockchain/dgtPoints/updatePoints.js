import { logger } from 'ethers'
import config from '../../config'
import { createTx, web3 } from '../../utilities/web3Utils'

const createUpdateObject = async (data) => {
  const _beneficiary = data.userId
  const _root = data.root
  const _proof = data.proof
  const _timestamp = data.timestamp

  logger.info({ data })

  const myContract = new web3.eth.Contract(config.CONTRACT.DGT_ABI, config.CONTRACT.DGT_ADDRESS)

  const transactionObject = {
    to: config.CONTRACT.DGT_ADDRESS,
    value: '0x0',
    data: myContract.methods
      .updatePoints(_beneficiary, _root, _proof, _timestamp).encodeABI()
  }

  return transactionObject
}

export const updatePoints = async (data) => {
  const txObject = await createUpdateObject(data)
  const txSerialized = await createTx(txObject)

  console.log('Before Asynch call')

  web3.eth.sendSignedTransaction(txSerialized)
    .once('transactionHash', function (hash) { console.log('txHash', hash) })
    .once('receipt', function (receipt) { console.log('receipt', receipt) })
    .on('confirmation', function (confNumber, receipt) { console.log('confNumber', confNumber, 'receipt', receipt) })
    .on('error', function (error) { console.log('error', error) })
    .then(function (receipt) {
      console.log('trasaction mined!', receipt)
    })

  console.log('After Asynch Call')
}
