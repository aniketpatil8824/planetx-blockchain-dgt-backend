const { upgrades } = require('hardhat')
const { artifacts, ethers } = require('hardhat')

const saveToConfig = require('../utils/saveToConfig')

async function main () {
  const AvatarContract = await ethers.getContractFactory('PlanetXAvatar')
  const AvatarABI = (await artifacts.readArtifact('PlanetXAvatar')).abi

  await saveToConfig('AVATAR', 'ABI', AvatarABI)
  const Avatar = await upgrades.deployProxy(AvatarContract, [], { initializer: 'initialize' })
  await Avatar.deployed()

  await saveToConfig('AVATAR', 'ADDRESS', Avatar.address)
  console.log('Avatar NFT contract deployed to:', Avatar.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
