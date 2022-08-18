
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('CompanyESP')
  const userABI = (await artifacts.readArtifact('CompanyESP')).abi

  await saveToConfig('CompanyESP', 'ABI', userABI)
  const user = await User.deploy()
  await user.deployed()

  await saveToConfig('CompanyESP', 'ADDRESS', user.address)
  console.log('CompanyESP contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
