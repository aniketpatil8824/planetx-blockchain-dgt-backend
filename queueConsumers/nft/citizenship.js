import { issueCitizenNFT } from '../../services/nft'
import logger from '../../utilities/logger'

export const consumeIssueCitizenNft = async (data) => {
  logger.info(data)
  await issueCitizenNFT(data.to, data.metadataUri, data.userId, data.txId)
}
