const { artifacts, ethers, upgrades } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const PlanetXTimelockController = await ethers.getContractFactory('PlanetXTimelockController')
  const PlanetXTimelockControllerABI = (await artifacts.readArtifact('PlanetXTimelockController')).abi

  await saveToConfig('PlanetXTimelockController', 'ABI', PlanetXTimelockControllerABI)

  const timeDelay = 172800 // 2 Days time delay
  const proposers = []
  const executors = []

  const planetXTimelockController = await upgrades.deployProxy(PlanetXTimelockController, [timeDelay, proposers, executors])
  await planetXTimelockController.deployed()

  await saveToConfig('PlanetXTimelockController', 'ADDRESS', planetXTimelockController.address)
  console.log('PlanetXTimelockController contract deployed to:', planetXTimelockController.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
