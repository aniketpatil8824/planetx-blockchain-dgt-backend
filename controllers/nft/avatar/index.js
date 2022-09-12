import identicon from 'identicon'
import fs from 'fs/promises'
import { pinataService } from '../../../utilities/ipfsUtils'
import * as responseUtils from '../../../utilities/responseUtils'
import logger from '../../../utilities/logger.js'
import Transaction from '../../../database/transaction'
import { uuid } from 'uuidv4'
import { publiser } from '../../../utilities/queueUtils'
import config from '../../../config'

export const issueAvatarNFT = async (req, res) => {
  try {
    const userId = req.body.userId
    const address = req.body.address
    if (!userId || !address) {
      return responseUtils.response.badRequestErrorResponse(res, 'User ID and address requried!')
    }
    const buffer = await identicon.generate(userId, 150)
    try {
      await fs.access('./identiconTmp')
    } catch (error) {
      await fs.mkdir('./identiconTmp')
    }

    await fs.writeFile(`./identiconTmp/${userId}.png`, buffer)
    const { id } = await pinataService.uploadImage(`./identiconTmp/${userId}.png`)
    console.log(id)
    await fs.unlink(`./identiconTmp/${userId}.png`)
    const metadataUri = `${pinataService.serviceBaseUrl}/${id}`

    const txId = uuid()
    const tx = new Transaction({ _id: txId, type: 'ISSUE_AVATAR_NFT' })
    await tx.save()
    await tx.setProcessing()
    await publiser(config.QUEUE.LIST.avatar, { to: address, metadataUri, userId, txId })

    responseUtils.response.successResponse(res, 'Citizenship NFT Issuing Transaction Sent', txId)
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}
