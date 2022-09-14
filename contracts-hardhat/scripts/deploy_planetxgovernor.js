
const { artifacts, ethers, upgrades } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const Token = await ethers.getContractFactory('PlanetXGovernor')
  const token = await Token.deploy()
  await token.deployed()
  console.log('PlanetXGovernor address:', token.address)

  const User = await ethers.getContractFactory('PlanetXGovernor')
  const userABI = (await artifacts.readArtifact('PlanetXGovernor')).abi
  const _token = token.address
  const _timelock = token.address
  const _votingDelay = 1
  const _votingPeriod = 1
  const _proposalThreshold = 1000
  const _quorumNumerator = 1

  await saveToConfig('PlanetXGovernor', 'ABI', userABI)
    const user = await upgrades.deployProxy(User, [ _timelock,  _token, _votingDelay, _votingPeriod, _proposalThreshold, _quorumNumerator],
    { initializer: 'initialize' })
  await user.deployed()

  await saveToConfig('PlanetXGovernor', 'ADDRESS', user.address)
  console.log('PlanetXGovernor contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
