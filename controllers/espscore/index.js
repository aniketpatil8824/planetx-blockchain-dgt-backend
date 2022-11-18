import CompanyScores from '../../database/companyScore'
import ProductScores from '../../database/productScore'
import { verifyCurrentESP, verifyPreviousESP } from '../../services/espScore'
import * as responseUtils from '../../utilities/responseUtils'
export { updatePoints as updateCompanyEsp } from './company'
export { updatePoints as updateProductEsp } from './product'

export const verifyCurrentEspScore = async (req, res) => {
  const type = typeof req.query.companyId === 'undefined' ? 'product' : 'company'
  const id = type === 'company' ? req.query.companyId : req.query.productId
  const score = req.query.score
  const user = type === 'company' ? await CompanyScores.findOne({ id }).exec() : await ProductScores.findOne({ id }).exec()
  if (user) {
    console.log({ user })
    const response = await verifyCurrentESP(user.companyId, score, type)
    responseUtils.response.successResponse(res, 'Verification Completed', { response })
  } else {
    responseUtils.response.serverErrorResponse(res, ' User Information Not Found', { Error: 'User Not Found' })
  }
}

export const verifyPreviousEspScore = async (req, res) => {
  const type = typeof req.query.companyId === 'undefined' ? 'product' : 'company'
  const id = type === 'company' ? req.query.companyId : req.query.productId
  const score = req.query.score
  const timestamp = req.query.time
  const user = type === 'company' ? await CompanyScores.findOne({ id }).exec() : await ProductScores.findOne({ id }).exec()
  if (user) {
    console.log({ user })
    const response = await verifyPreviousESP(user.companyId, timestamp, score, type)
    responseUtils.response.successResponse(res, 'Verification Completed', { response })
  } else {
    responseUtils.response.serverErrorResponse(res, ' User Information Not Found', { Error: 'User Not Found' })
  }
}
