import config from '../../config'
import { web3 } from '../../utilities/web3Utils'

const myContract = new web3.eth.Contract(config.CONTRACT.CompanyESP_ABI, config.CONTRACT.CompanyESP_ADDRESS)

export const verifyCurrentCompanyESP = async (userId, points) => {
  const verified = await myContract.methods
    .verifyCurrentBalance(userId, points)
    .call()
  return { verified }
}

export const verifyPreviousCompanyESP = async (userId, timestamp, points) => {
  const verified = await myContract.methods
    .verifyCurrentBalance(userId, timestamp, points)
    .call()
  return { verified }
}

export const getOwner = async () => {
  const verified = await myContract.methods
    .owner()
    .call()
  return { verified }
}
