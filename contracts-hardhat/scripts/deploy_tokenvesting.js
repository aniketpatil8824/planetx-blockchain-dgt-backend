
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('TokenVesting')
  const userABI = (await artifacts.readArtifact('TokenVesting')).abi

  await saveToConfig('TokenVesting', 'ABI', userABI)
  const user = await User.deploy('0x001c3f9B0F3B87FAF905c89f85Fc8f90c63e0503')
  await user.deployed()

  await saveToConfig('TokenVesting', 'ADDRESS', user.address)
  console.log('TokenVesting contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
