import config from '../config'
import { consumer } from '../utilities/queueUtils'
import { consumeUpdateCompanyESP } from './company'
import { consumeUpdateDgt } from './dgt'
import { consumeUpdateProductESP } from './product'
import { createNewSchedule, releaseUserScheduleAmount, revokeUserSchedule, withdrawAmounts } from './vesting/updates'

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

const updateCompanyESP = () => {
  consumer(config.QUEUE.LIST.updateCompanyESP, consumeUpdateCompanyESP)
}

const updateProductESP = () => {
  consumer(config.QUEUE.LIST.updateProductESP, consumeUpdateProductESP)
}

const consumerInit = () => {
  consumeUpdateDGT()
  createSchedule()
  revokeSchedule()
  releaseFunds()
  withdrawFunds()
  updateCompanyESP()
  updateProductESP()
}

export default consumerInit
