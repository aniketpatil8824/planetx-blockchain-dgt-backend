import { updateCompanyEspScore } from '../../services/companyScore'
import logger from '../../utilities/logger'

export const consumeUpdateCompanyESP = async (data) => {
  logger.info(data)
  await updateCompanyEspScore(data.userId, data.root, data.proof, data.timestamp, data.txId)
}
