import config from '../../config'
import { createTx, web3 } from '../../utilities/web3Utils'
import Transaction from '../../database/transaction'
import logger from '../../utilities/logger'

export const issueCitizenNFT = async (to, metadataUri, userId, txId) => {
  const citizenshipContract = new web3.eth.Contract(config.CONTRACT.CITIZENSHIP_ABI, config.CONTRACT.CITIZENSHIP_ADDRESS)
  const txObject = {
    to: config.CONTRACT.CITIZENSHIP_ADDRESS,
    value: '0x0',
    data: citizenshipContract.methods.mint(to, metadataUri).encodeABI()
  }

  const txSerialized = await createTx(txObject)

  const tx = await Transaction.findById(txId)

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
}
