import { logger } from 'ethers'
import config from '../../config'
import { createTx, web3 } from '../../utilities/web3Utils'
import Transaction from '../../database/transaction.js'

const createUpdateObject = async (userId, root, proof, timestamp, type) => {
  const myContract = type === 'company'
    ? new web3.eth.Contract(config.CONTRACT.CompanyESP_ABI, config.CONTRACT.CompanyESP_ADDRESS)
    : new web3.eth.Contract(config.CONTRACT.ProductESP_ABI, config.CONTRACT.ProductESP_ADDRESS)
  const transactionObject = {
    to: type === 'company' ? config.CONTRACT.CompanyESP_ADDRESS : config.CONTRACT.ProductESP_ADDRESS,
    value: '0x0',
    data: myContract.methods
      .updatePoints(userId, root, proof, timestamp).encodeABI()
  }

  return transactionObject
}

export const updateChainEspScore = async (userId, root, proof, timestamp, txId, type) => {
  const txObject = await createUpdateObject(userId, root, proof, timestamp, type)
  const txSerialized = await createTx(txObject)

  const tx = await Transaction.findById(txId)

  console.log('Before Async call')

  web3.eth.sendSignedTransaction(txSerialized)
    .once('transactionHash', async (txHash) => {
      logger.info('Transaction Sent, TxHash: ' + txHash)
      await tx.saveTransactionHash(txHash)
    })
    .once('receipt', async (receipt) => {
      logger.info(`Transaction Status: ${(receipt.status ? 'Successful' : 'Failed')}`)
      if (receipt.status) await tx.setSuccess()
      else await tx.setFailed()
    })
    .on('confirmation', async (confNumber, receipt) => { console.log('confNumber', confNumber, 'receipt', receipt) })
    .on('error', async (web3err) => {
      logger.info('Transaction Status: ' + 'Failed')
      logger.error('Web3 Error, Transaction Reverted')
      await tx.setFailed()
    })
    .then(async (receipt) => {
      logger.info('Transaction Completed', receipt)
    })

  console.log('After Async Call')
}
