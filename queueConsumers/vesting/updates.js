import { createVestingSchedule, releaseVestingScheduleAmount, revokeVestingSchedule, withdrawFunds } from '../../services/vesting'
import logger from '../../utilities/logger'

export const createNewSchedule = async (data) => {
  logger.info(data)
  await createVestingSchedule(data.address, data.startTime, data.cliffTime, data.duration, data.slicePeriod, data.revocable, data.amount, data.txId)
}

export const revokeUserSchedule = async (data) => {
  logger.info(data)
  await revokeVestingSchedule(data.scheduleId, data.releasable, data.txId)
}

export const releaseUserScheduleAmount = async (data) => {
  logger.info(data)
  await releaseVestingScheduleAmount(data.scheduleId, data.amount, data.txId)
}

export const withdrawAmounts = async (data) => {
  logger.info(data)
  await withdrawFunds(data.amount, data.txId)
}
