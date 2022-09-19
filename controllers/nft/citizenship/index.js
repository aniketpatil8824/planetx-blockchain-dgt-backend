import * as responseUtils from '../../../utilities/responseUtils'
import logger from '../../../utilities/logger.js'
import Transaction from '../../../database/transaction'
import { uuid } from 'uuidv4'
import { publiser } from '../../../utilities/queueUtils'
import config from '../../../config'
import { pinataService } from '../../../utilities/ipfsUtils'

export const issueCitizenshipNFT = async (req, res) => {
  try {
    const userId = req.body.userId
    const address = req.body.address
    if (!userId || !address) {
      return responseUtils.response.badRequestErrorResponse(res, 'User ID and address requried!')
    }
    const { id } = await pinataService.uploadImage('./identicon.png')
    const data = await pinataService.uploadJson({
      name: 'PlanetX Citizenship NFT',
      userId,
      description: 'This is Planetx Citizenship NFT',
      image: `${pinataService.serviceBaseUrl}/${id}`,
      external_url: 'planetx.com',
      attributes: [
        {
          trait_type: 'citizen',
          value: 'yes'
        }
      ]
    })
    const metadataUri = `${pinataService.serviceBaseUrl}/${data.id}`

    const txId = uuid()
    const tx = new Transaction({ _id: txId, type: 'ISSUE_CITIZEN_NFT' })
    await tx.save()
    await tx.setProcessing()
    await publiser(config.QUEUE.LIST.citizen, { to: address, metadataUri, userId, txId })

    responseUtils.response.successResponse(res, 'Citizenship NFT Issuing Transaction Sent', txId)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}
