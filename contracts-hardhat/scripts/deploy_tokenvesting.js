
const { artifacts, ethers } = require('hardhat')
const config = require('../../config/contract.json')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const TokenVesting = await ethers.getContractFactory('TokenVesting')
  const TokenVestingABI = (await artifacts.readArtifact('TokenVesting')).abi

  await saveToConfig('TokenVesting', 'ABI', TokenVestingABI)
  const dgtxAddress = config.DGTX_ADDRESS
  const tokenVesting = await TokenVesting.deploy(dgtxAddress)
  await tokenVesting.deployed()

  await saveToConfig('TokenVesting', 'ADDRESS', tokenVesting.address)
  console.log('TokenVesting contract deployed to:', tokenVesting.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
