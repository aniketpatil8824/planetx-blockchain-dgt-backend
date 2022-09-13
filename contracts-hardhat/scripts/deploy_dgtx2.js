
const { artifacts, ethers, upgrades } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const Token = await ethers.getContractFactory('DGTX')
  const token = await Token.deploy(
    'DGTX PlanetX',
    'DGTX',
    '1000000000000000000000000')
  await token.deployed()
  console.log('Token address:', token.address)

  const User = await ethers.getContractFactory('DGTX')
  const userABI = (await artifacts.readArtifact('DGTX')).abi

  await saveToConfig('DGTX', 'ABI', userABI)
  const user = await upgrades.deployProxy(User, [token.address],
    { initializer: 'initialize' })
  await user.deployed()

  await saveToConfig('DGTX', 'ADDRESS', user.address)
  console.log('DGTX contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
