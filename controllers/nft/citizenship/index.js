import * as responseUtils from '../../../utilities/responseUtils'
import logger from '../../../utilities/logger.js'

export const issueCitizenshipNFT = async (req, res) => {
  try {
    const userId = req.body.userId

    responseUtils.response.successResponse(res, 'Citizenship NFT Issuing Transaction Sent')
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, 'Something Went Wrong', err)
  }
}
