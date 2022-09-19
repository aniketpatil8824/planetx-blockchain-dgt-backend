
const { artifacts, ethers, upgrades } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const CompanyESP = await ethers.getContractFactory('CompanyESP')
  const companyESPABI = (await artifacts.readArtifact('CompanyESP')).abi

  await saveToConfig('CompanyESP', 'ABI', companyESPABI)
  const companyESP = await upgrades.deployProxy(CompanyESP)
  await companyESP.deployed()

  await saveToConfig('CompanyESP', 'ADDRESS', companyESP.address)
  console.log('CompanyESP contract deployed to:', companyESP.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
