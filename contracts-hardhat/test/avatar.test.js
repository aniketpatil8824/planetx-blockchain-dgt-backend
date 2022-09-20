/* eslint-disable no-undef */
const { expect } = require('chai')
const { ethers, upgrades } = require('hardhat')

describe('Avatar NFT Contract', () => {
  let avatarContract; let owner, symbol, minter
  beforeEach(async () => {
    const Avatar = await ethers.getContractFactory('PlanetXAvatar')
    avatarContract = await upgrades.deployProxy(Avatar);
    [owner, minter] = await ethers.getSigners()
    symbol = 'PXA'
  })

  describe('Deployment Testing', () => {
    it('Should set the right symbol', async () => {
      expect(await avatarContract.symbol()).to.equal(symbol)
    })
  })

  describe('Minting Test', () => {
    it('Should mint nft to a address', async () => {
      const txResponse = await avatarContract.safeMint(minter.address, 'https://gateway.pinata.cloud/ipfs/Qmf7VDtJXrbTm8qNGaXDdppvgW7eNizeqR6d3puww1S3by')
      const txReceipt = await txResponse.wait()
      const [mintEvent] = txReceipt.events
      const { tokenId } = mintEvent.args
      console.log(tokenId.toNumber())
      expect(await avatarContract.ownerOf(tokenId)).to.equal(minter.address)
    })
  })
})
