const { artifacts, ethers, upgrades } = require('hardhat')
const config = require('../../config/contract.json')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const PlanetXGovernor = await ethers.getContractFactory('PlanetXGovernor')
  const PlanetXGovernorABI = (await artifacts.readArtifact('PlanetXGovernor')).abi

  await saveToConfig('PlanetXGovernor', 'ABI', PlanetXGovernorABI)

  const votingDelay = 1 // 1 block Voting Delay
  const votingPeriod = 45818 // 1 week Voting Period
  const proposalThreshold = 1 // 0.1% Proposal Threshold
  const quorumNumerator = 1 // 1% Quorum Required
  const DGTX_ADDRESS = config.DGTX_ADDRESS
  const timeControllerAddress = config.PlanetXTimelockController_ADDRESS

  const planetXGovernor = await upgrades.deployProxy(PlanetXGovernor, [DGTX_ADDRESS, timeControllerAddress, votingDelay, votingPeriod, proposalThreshold, quorumNumerator])
  await planetXGovernor.deployed()

  await saveToConfig('PlanetXGovernor', 'ADDRESS', planetXGovernor.address)
  console.log('PlanetXGovernor contract deployed to:', planetXGovernor.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
