import { issueAvatarNFT } from '../../services/nft'
import logger from '../../utilities/logger'

export const consumeIssueAvatarNft = async (data) => {
  logger.info(data)
  await issueAvatarNFT(data.to, data.metadataUri, data.userId, data.txId)
}
