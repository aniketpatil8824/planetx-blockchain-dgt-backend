import SignNonce from '../../database/signNonce.js'
import * as responseUtils from '../../utilities/responseUtils'
import logger from '../../utilities/logger.js'
import config from '../../config'
import { getSigningData, verifySignature } from '../../utilities/web3Utils'

export const getAccountNounce = async (req, res) => {
  const signer = req.body.signer.toLowerCase()
  try {
    const signerData = await SignNonce.findOne({ signer })
    responseUtils.response.successResponse(res, 'Nounce Is', { nonce: signerData.nonce })
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, err)
  }
}

export const signingData = async (req, res) => {
  const signer = req.body.signer.toLowerCase()
  try {
    const signerData = await SignNonce.findOne({ signer })
    const signingData = await getSigningData('PlanetX Wallet Connect')
    signerData.nonce = signingData.nonce
    await signerData.save()
    responseUtils.response.successResponse(res, 'Signing Data', { data: signingData.data })
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, err)
  }
}

export const signatureVerify = async (req, res) => {
  const signer = req.body.signer.toLowerCase()
  const signature = req.body.signature
  try {
    const signerData = await SignNonce.findOne({ signer })
    const result = await verifySignature('PlanetX Wallet Connect', signerData.nonce, signature, signer)
    if (!result) {
      return responseUtils.response.authorizationErrorResponse(res, 'Invalid Signature', { signature, result })
    }

    responseUtils.response.successResponse(res, 'Verification Successful', { signature, result })
  } catch (err) {
    logger.error(err)
    responseUtils.response.serverErrorResponse(res, err)
  }
}
