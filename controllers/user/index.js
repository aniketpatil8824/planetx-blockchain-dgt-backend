import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import UserPoints from '../../database/userPoints.js'

const createAccount = async (username) => {
  try {
    const newUser = new UserPoints({
      username,
      points: [0]
    })
    await newUser.save()
  } catch (err) {
    logger.error(err)
  }
}

export const updatePoints = async (req, res) => {
  logger.info(req.body)
  responseUtils.response.successResponse(res, 'Verification Successful', { signature: 'result' })
}

export const verifyCurrentPoints = async (req, res) => {
  console.log(req.body)
  responseUtils.response.successResponse(res, 'Verification Successful', { signature: 'result verifuy' })

  //   const signer = req.body.signer.toLowerCase()
  //   const signature = req.body.signature
  //   try {
  //     const signerData = await SignNonce.findOne({ signer })
  //     const result = await verifySignature('PlanetX Wallet Connect', signerData.nonce, signature, signer)
  //     if (!result) {
  //       return responseUtils.response.authorizationErrorResponse(res, 'Invalid Signature', { signature, result })
  //     }

  //     responseUtils.response.successResponse(res, 'Verification Successful', { signature, result })
  //   } catch (err) {
  //     logger.error(err)
  //     responseUtils.response.serverErrorResponse(res, err)
  //   }
}
