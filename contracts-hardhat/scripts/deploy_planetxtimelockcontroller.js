
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('PlanetXTimelockController')
  const userABI = (await artifacts.readArtifact('PlanetXTimelockController')).abi

  await saveToConfig('PlanetXTimelockController', 'ABI', userABI)
  const user = await User.deploy()
  await user.deployed()

  await saveToConfig('PlanetXTimelockController', 'ADDRESS', user.address)
  console.log('PlanetXTimelockController contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
