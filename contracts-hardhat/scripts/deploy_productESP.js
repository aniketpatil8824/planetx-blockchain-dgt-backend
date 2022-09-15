
const { artifacts, ethers, upgrades } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const ProductESP = await ethers.getContractFactory('ProductESP')
  const productESPABI = (await artifacts.readArtifact('ProductESP')).abi

  await saveToConfig('ProductESP', 'ABI', productESPABI)
  const productESP = await upgrades.deployProxy(ProductESP)
  await productESP.deployed()

  await saveToConfig('ProductESP', 'ADDRESS', productESP.address)
  console.log('ProductESP contract deployed to:', productESP.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
