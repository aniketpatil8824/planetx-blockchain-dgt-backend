import config from '../../config'
import { web3 } from '../../utilities/web3Utils'

export const verifyCurrentESP = async (userId, points, type) => {
  const myContract = type === 'company'
    ? new web3.eth.Contract(config.CONTRACT.CompanyESP_ABI, config.CONTRACT.CompanyESP_ADDRESS)
    : new web3.eth.Contract(config.CONTRACT.ProductESP_ABI, config.CONTRACT.ProductESP_ADDRESS)

  const verified = await myContract.methods
    .verifyCurrentBalance(userId, points)
    .call()
  return { verified }
}

export const verifyPreviousESP = async (userId, timestamp, points, type) => {
  const myContract = type === 'company'
    ? new web3.eth.Contract(config.CONTRACT.CompanyESP_ABI, config.CONTRACT.CompanyESP_ADDRESS)
    : new web3.eth.Contract(config.CONTRACT.ProductESP_ABI, config.CONTRACT.ProductESP_ADDRESS)
  const verified = await myContract.methods
    .verifyHistoricalBalance(userId, timestamp, points)
    .call()
  return { verified }
}

export const getOwner = async (type) => {
  const myContract = type === 'company'
    ? new web3.eth.Contract(config.CONTRACT.CompanyESP_ABI, config.CONTRACT.CompanyESP_ADDRESS)
    : new web3.eth.Contract(config.CONTRACT.ProductESP_ABI, config.CONTRACT.ProductESP_ADDRESS)
  const verified = await myContract.methods
    .owner()
    .call()
  return { verified }
}
