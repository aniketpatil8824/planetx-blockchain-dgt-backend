
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('ProductESP')
  const userABI = (await artifacts.readArtifact('ProductESP')).abi

  await saveToConfig('ProductESP', 'ABI', userABI)
  const user = await User.deploy()
  await user.deployed()

  await saveToConfig('ProductESP', 'ADDRESS', user.address)
  console.log('ProductESP contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
