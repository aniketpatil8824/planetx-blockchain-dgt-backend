
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('DGTX')
  const userABI = (await artifacts.readArtifact('DGTX')).abi

  await saveToConfig('DGTX', 'ABI', userABI)
  const user = await User.deploy(100000000)
  await user.deployed()

  await saveToConfig('DGTX', 'ADDRESS', user.address)
  console.log('DGTX contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
