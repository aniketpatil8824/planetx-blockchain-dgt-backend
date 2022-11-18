import { updateChainEspScore } from '../../services/espScore'
import logger from '../../utilities/logger'

export const consumeUpdateESP = async (data) => {
  logger.info(data)
  await updateChainEspScore(data.userId, data.root, data.proof, data.timestamp, data.txId, data.type)
}
