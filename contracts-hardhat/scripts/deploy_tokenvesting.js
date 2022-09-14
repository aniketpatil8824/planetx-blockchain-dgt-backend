
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('TokenVesting')
  const userABI = (await artifacts.readArtifact('TokenVesting')).abi

  await saveToConfig('TokenVesting', 'ABI', userABI)
  const user = await User.deploy('0xAa3501b86d55a425E70C3bfC9218D7651a832A58')
  await user.deployed()

  await saveToConfig('TokenVesting', 'ADDRESS', user.address)
  console.log('TokenVesting contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
