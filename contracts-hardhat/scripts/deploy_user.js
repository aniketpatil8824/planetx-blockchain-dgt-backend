
const hre = require('hardhat')
const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const Token = await hre.ethers.getContractFactory('Token')
  const token = await Token.deploy(
    'Test Token',
    'TT',
    '1000000000000000000000000')
  await token.deployed()
  console.log('Token address:', token.address)

  const User = await hre.ethers.getContractFactory('User')
  const userABI = (await hre.artifacts.readArtifact('User')).abi
  await saveToConfig('USER', 'ABI', userABI)
  const user = await User.deploy(token.address)
  await user.deployed()
  await saveToConfig('USER', 'ADDRESS', user.address)
  console.log('Greeter deployed to:', user.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
