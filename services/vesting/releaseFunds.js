import { logger } from 'ethers'
import config from '../../config'
import { createTx, web3 } from '../../utilities/web3Utils'
import Transaction from '../../database/transaction.js'

const createUpdateObject = async (scheduleId, amount) => {
  const myContract = new web3.eth.Contract(config.CONTRACT.VESTING_ABI, config.CONTRACT.VESTING_ADDRESS)

  const transactionObject = {
    to: config.CONTRACT.VESTING_ABI,
    value: '0x0',
    data: myContract.methods
      .release(scheduleId, amount).encodeABI()
  }

  return transactionObject
}

export const releaseVestingScheduleAmount = async (scheduleId, amount, txId) => {
  const txObject = await createUpdateObject(scheduleId, amount)
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
