import config from '../config'
import { consumer } from '../utilities/queueUtils'
import { consumeUpdateCompanyESP } from './company'
import { consumeUpdateDgt } from './dgt'
import { createNewSchedule, releaseUserScheduleAmount, revokeUserSchedule, withdrawAmounts } from './vesting/updates'

export const consumeUpdateDGT = () => {
  consumer(config.QUEUE.LIST.updateDgt, consumeUpdateDgt)
}

export const createSchedule = () => {
  consumer(config.QUEUE.LIST.createSchedule, createNewSchedule)
}

export const revokeSchedule = () => {
  consumer(config.QUEUE.LIST.revokeSchedule, revokeUserSchedule)
}

export const releaseFunds = () => {
  consumer(config.QUEUE.LIST.releaseFunds, releaseUserScheduleAmount)
}

export const withdrawFunds = () => {
  consumer(config.QUEUE.LIST.withdrawFunds, withdrawAmounts)
}

export const updateCompanyESP = () => {
  consumer(config.QUEUE.LIST.updateCompanyESP, consumeUpdateCompanyESP)
}
