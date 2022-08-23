import { updateProductEspScore } from '../../services/productScore'
import logger from '../../utilities/logger'

export const consumeUpdateProductESP = async (data) => {
  logger.info(data)
  await updateProductEspScore(data.userId, data.root, data.proof, data.timestamp, data.txId)
}
