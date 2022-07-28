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
    value: '0x',
    data: myContract.methods
      .updatePoints(_beneficiary, _root, _proof, _timestamp).encodeABI()
  }

  return transactionObject
}

export const updatePoints = async (data) => {
  const txObject = await createUpdateObject(data)
  const txSerialized = await createTx(txObject)

  web3.eth
    .sendSignedTransaction(txSerialized)
    .on('receipt', async (receipt) => {
      //   await addTransaction(req.body)
      logger.info({
        txHash: receipt.transactionHash,
        status: receipt.status
      })
      // await sendTxData(
      //     {
      //         txHash: receipt.transactionHash,
      //         status: receipt.status,
      //         tokenId: data.tokenId,
      //         type: "auction_create",
      //     },
      //     "/v1/asset/order/orderTx"
      // );
    })
    .on('error', async (error) => {
    //   await init(adminAddress)
      logger.info(error)
    })
}
