/* eslint-disable no-undef */
const { expect } = require('chai')
const { ethers, upgrades } = require('hardhat')

describe('Citizen NFT Contract', () => {
  let citizenContract, owner, symbol, minter
  beforeEach(async () => {
    const Citizen = await ethers.getContractFactory('PlanetXCitizen')
    citizenContract = await upgrades.deployProxy(Citizen);
    [owner, minter] = await ethers.getSigners()
    symbol = 'PXC'
  })

  describe('Deployment Testing', () => {
    it('Should set the right symbol', async () => {
      expect(await citizenContract.symbol()).to.equal(symbol)
    })
  })

  describe('Minting Test', () => {
    it('Should mint nft to a address', async () => {
      const txResponse = await citizenContract.safeMint(minter.address, 'https://gateway.pinata.cloud/ipfs/Qmf7VDtJXrbTm8qNGaXDdppvgW7eNizeqR6d3puww1S3by')
      const txReceipt = await txResponse.wait()
      const [mintEvent] = txReceipt.events
      const { tokenId } = mintEvent.args
      console.log(tokenId.toNumber())
      expect(await citizenContract.ownerOf(tokenId)).to.equal(minter.address)
    })
  })
})
