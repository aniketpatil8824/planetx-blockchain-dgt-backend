/* eslint-disable no-undef */
const { expect } = require('chai')
const { ethers } = require('hardhat')
const { getRootandProof } = require('../helper/tree.cjs')

describe('DGT Contract', () => {
  let Dgt, user, owner, addr1, addr2
  beforeEach(async () => {
    Dgt = await ethers.getContractFactory('DGT')
    user = await Dgt.deploy();
    [owner, addr1, addr2] = await ethers.getSigners()
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await user.owner()).to.equal(owner.address)
    })
  })

  describe('Transactions', () => {
    it('Only Owner Should update the points', async () => {
      const tree = getRootandProof([0, 5], 0)
      const timestamp = 100
      await expect(
        user
          .connect(addr1)
          .updatePoints(addr1.address, tree.rootHash, tree.hexProof, timestamp)
      )
        .to
        .be
        .revertedWith('Ownable: caller is not the owner')
    })

    it('Should fail while verifying, if user not created', async () => {
      await expect(
        user
          .connect(owner)
          .verifyCurrentBalance(addr2.address, 10)
      )
        .to
        .be
        .revertedWith('User Info Not Found')
    })

    it('Should return the total updates for a beneficiary correctly ', async () => {
      expect(await user.getBeneficiariesHistoryCount(addr1.address)).to.equal(0)

      const tree = getRootandProof([0, 5], 0)
      const timestamp = 100
      await user.updatePoints(addr1.address, tree.rootHash, tree.hexProof, timestamp)
      expect(await user.getBeneficiariesHistoryCount(addr1.address)).to.equal(1)
    })

    it('Should Update the Owner Correctly', async () => {
      await user.transferOwnership(addr1.address)
      expect(await user.owner()).to.equal(addr1.address)
    })

    it('Should Update the User Points Correctly and able to verify', async () => {
      let tree = getRootandProof([0, 5, 10, 15, 20], 0)
      let timestamp = 100
      await user.updatePoints(addr1.address, tree.rootHash, tree.hexProof, timestamp)
      expect(await user.getBeneficiariesHistoryCount(addr1.address)).to.equal(1)
      expect(await user.verifyCurrentBalance(addr1.address, 0)).to.equal(true)

      tree = getRootandProof([0, 5, 10, 15, 20], 1)
      timestamp = 200
      await user.updatePoints(addr1.address, tree.rootHash, tree.hexProof, timestamp)
      expect(await user.getBeneficiariesHistoryCount(addr1.address)).to.equal(2)
      expect(await user.verifyCurrentBalance(addr1.address, 5)).to.equal(true)
      expect(await user.verifyHistoricalBalance(addr1.address, 150, 0)).to.equal(true)
    })
  })
})
