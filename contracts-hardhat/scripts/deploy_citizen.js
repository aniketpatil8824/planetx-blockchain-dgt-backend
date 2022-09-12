
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const CitizenshipContract = await ethers.getContractFactory('PlanetXCitizen')
  const CitizenshipABI = (await artifacts.readArtifact('PlanetXCitizen')).abi

  await saveToConfig('CITIZENSHIP', 'ABI', CitizenshipABI)
  const Citizenship = await CitizenshipContract.deploy()
  await Citizenship.deployed()

  await saveToConfig('CITIZENSHIP', 'ADDRESS', Citizenship.address)
  console.log('Citizenship NFT contract deployed to:', Citizenship.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
