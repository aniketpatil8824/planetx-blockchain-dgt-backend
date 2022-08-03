import config from '../../config'
import { web3 } from '../../utilities/web3Utils'

const myContract = new web3.eth.Contract(config.CONTRACT.VESTING_ABI, config.CONTRACT.VESTING_ADDRESS)

export const getUserSchedulesCount = async (userAddress) => {
  const response = await myContract.methods
    .getVestingSchedulesCountByBeneficiary(userAddress)
    .call()
  return { response }
}

export const getScheduleReleasableAmount = async (scheduleId) => {
  const response = await myContract.methods
    .computeReleasableAmount(scheduleId)
    .call()
  return { response }
}

export const getScheduleInfo = async (scheduleId) => {
  const response = await myContract.methods
    .getVestingSchedule(scheduleId)
    .call()
  return { response }
}

export const getTotalScheduleAmount = async () => {
  const response = await myContract.methods
    .getVestingSchedulesTotalAmount()
    .call()
  return { response }
}

export const getTotalSchedules = async () => {
  const response = await myContract.methods
    .getVestingSchedulesCount()
    .call()
  return { response }
}

export const getTotalWithdrawableAmount = async () => {
  const response = await myContract.methods
    .getWithdrawableAmount()
    .call()
  return { response }
}
