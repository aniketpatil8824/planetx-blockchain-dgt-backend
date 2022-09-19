
const { artifacts, ethers, upgrades } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const User = await ethers.getContractFactory('DGT')
  const userABI = (await artifacts.readArtifact('DGT')).abi

  await saveToConfig('DGT', 'ABI', userABI)
  const user = await upgrades.deployProxy(User)
  await user.deployed()

  await saveToConfig('DGT', 'ADDRESS', user.address)
  console.log('DGT contract deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
