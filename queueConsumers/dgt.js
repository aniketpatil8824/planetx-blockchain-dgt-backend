import { updateUserPoints } from '../services/dgtpoints/updatePoints'
import logger from '../utilities/logger'

export const consumeUpdateDgt = async (data) => {
  logger.info(data)
  await updateUserPoints(data.userId, data.root, data.proof, data.timestamp, data.txId)
}
