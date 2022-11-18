import config from '../config'
import { consumer } from '../utilities/queueUtils'
import { consumeUpdateESP } from './espScore'
import { consumeUpdateDgt } from './dgt'
import { createNewSchedule, releaseUserScheduleAmount, revokeUserSchedule, withdrawAmounts } from './vesting/updates'
import { consumeIssueAvatarNft, consumeIssueCitizenNft } from './nft'

const consumeUpdateDGT = () => {
  consumer(config.QUEUE.LIST.updateDgt, consumeUpdateDgt)
}
const createSchedule = () => {
  consumer(config.QUEUE.LIST.createSchedule, createNewSchedule)
}

const revokeSchedule = () => {
  consumer(config.QUEUE.LIST.revokeSchedule, revokeUserSchedule)
}

const releaseFunds = () => {
  consumer(config.QUEUE.LIST.releaseFunds, releaseUserScheduleAmount)
}

const withdrawFunds = () => {
  consumer(config.QUEUE.LIST.withdrawFunds, withdrawAmounts)
}

const updateESP = () => {
  consumer(config.QUEUE.LIST.updateESP, consumeUpdateESP)
}

const issueCitizenNFT = () => {
  consumer(config.QUEUE.LIST.citizen, consumeIssueCitizenNft)
}
const issueAvatarNFT = () => {
  consumer(config.QUEUE.LIST.avatar, consumeIssueAvatarNft)
}

const consumerInit = () => {
  consumeUpdateDGT()
  createSchedule()
  revokeSchedule()
  releaseFunds()
  withdrawFunds()
  updateESP()
  issueCitizenNFT()
  issueAvatarNFT()
}

export default consumerInit
