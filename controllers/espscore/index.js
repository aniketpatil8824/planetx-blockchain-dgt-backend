import CompanyScores from '../../database/companyScore'
import ProductScores from '../../database/productScore'
import { verifyCurrentESP } from '../../services/espScore'

export const verifyCurrentPoints = async (req, res) => {
  let user, id
  const type = typeof req.query.companyId === 'undefined' ? 'product' : 'company'
  id = type === 'company' ? req.query.companyId : req.query.productId
  const companyId = req.query.companyId
  const score = req.query.score
  user = await CompanyScores.findOne({ companyId }).exec()
  if (user) {
    console.log({ user })
    const response = await verifyCurrentESP(user.companyId, score)
    responseUtils.response.successResponse(res, 'Verification Completed', { response })
  } else {
    responseUtils.response.serverErrorResponse(res, ' User Information Not Found', { Error: 'User Not Found' })
  }
}
