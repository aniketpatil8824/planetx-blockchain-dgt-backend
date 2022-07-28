import { updatePoints } from '../../txBlockchain/dgtPoints/updatePoints'

export const updateUserPoints = async (data) => {
  try {
    // Queue Management and Offchain Data validation to be updated here
    updatePoints(data)
    // await publishToQueue(config.QUEUE.updateMaintainer, req.body) to be used later
    return {
      response: 'User Points Updated Successfully'
    }
  } catch (e) {
    return e
  }
}
