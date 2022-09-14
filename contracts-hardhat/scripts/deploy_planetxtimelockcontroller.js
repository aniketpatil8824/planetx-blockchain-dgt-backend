
const { artifacts, ethers, upgrades } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('PlanetXTimelockController')
  const userABI = (await artifacts.readArtifact('PlanetXTimelockController')).abi
  const minDelay = 0
  const proposars = ["0x2a7ac99a7cE7777dD4598e8eb898862a2440fe51"]
  const executors = ["0x2a7ac99a7cE7777dD4598e8eb898862a2440fe51"]

  await saveToConfig('PlanetXTimelockController', 'ABI', userABI)
  const user = await upgrades.deployProxy(User, [minDelay, proposars, executors], { initializer: 'initialize' })
  await user.deployed()

  await saveToConfig('PlanetXTimelockController', 'ADDRESS', user.address)
  console.log('PlanetXTimelockController contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
