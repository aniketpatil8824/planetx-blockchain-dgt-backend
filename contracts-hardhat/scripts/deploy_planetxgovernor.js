
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('PlanetXGovernor')
  const userABI = (await artifacts.readArtifact('PlanetXGovernor')).abi

  await saveToConfig('PlanetXGovernor', 'ABI', userABI)
  const user = await User.deploy()
  await user.deployed()

  await saveToConfig('PlanetXGovernor', 'ADDRESS', user.address)
  console.log('PlanetXGovernor contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
