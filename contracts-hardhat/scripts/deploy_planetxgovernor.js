
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const DGT = await ethers.getContractFactory('DGTX')
  const DGTABI = (await artifacts.readArtifact('DGTX')).abi

  await saveToConfig('DGT', 'ABI', DGTABI)
  const totalSupply = '210000000000000000000000000'
  const dgtx = await DGT.deploy(totalSupply)
  await dgtx.deployed()

  await saveToConfig('DGT', 'ADDRESS', dgtx.address)
  console.log('DGT contract deployed to:', dgtx.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

