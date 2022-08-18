/* eslint-disable no-undef */
const { expect } = require('chai')
const { ethers } = require('hardhat')
const { getRootandProof, generateId } = require('../helper/tree.cjs')

describe('Product ESP Score Contract', () => {
  let company, user, owner, addr1
  beforeEach(async () => {
    company = await ethers.getContractFactory('ProductESP')
    user = await company.deploy();
    [owner, addr1] = await ethers.getSigners()
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await user.owner()).to.equal(owner.address)
    })
  })

  describe('Transactions', () => {
    it('Only Owner Should update the ESP Score', async () => {
      const tree = getRootandProof([0, 5], 0)
      const timestamp = 100
      const id = generateId('user1')
      await expect(
        user
          .connect(addr1)
          .updatePoints(id, tree.rootHash, tree.hexProof, timestamp)
      )
        .to
        .be
        .revertedWith('Ownable: caller is not the owner')
    })

    it('Should fail while verifying, if user not created', async () => {
      const id = generateId('user1')
      await expect(
        user
          .connect(owner)
          .verifyCurrentBalance(id, 10)
      )
        .to
        .be
        .revertedWith('User Info Not Found')
    })

    it('Should return the total updates for a beneficiary correctly ', async () => {
      const id = generateId('user1')
      expect(await user.getBeneficiariesHistoryCount(id)).to.equal(0)

      const tree = getRootandProof([0, 5], 0)
      const timestamp = 100

      await user.updatePoints(id, tree.rootHash, tree.hexProof, timestamp)
      expect(await user.getBeneficiariesHistoryCount(id)).to.equal(1)
    })

    it('Should Update the Owner Correctly', async () => {
      await user.transferOwnership(addr1.address)
      expect(await user.owner()).to.equal(addr1.address)
    })

    it('Should Update the ESP Score Correctly and be able to verify', async () => {
      let id = generateId('user1')
      let tree = getRootandProof([0, 5, 10, 15, 20], 0)
      let timestamp = 100
      await user.updatePoints(id, tree.rootHash, tree.hexProof, timestamp)
      expect(await user.getBeneficiariesHistoryCount(id)).to.equal(1)
      expect(await user.verifyCurrentBalance(id, 0)).to.equal(true)

      tree = getRootandProof([0, 5, 10, 15, 20], 1)
      timestamp = 200
      await user.updatePoints(id, tree.rootHash, tree.hexProof, timestamp)
      expect(await user.getBeneficiariesHistoryCount(id)).to.equal(2)
      expect(await user.verifyCurrentBalance(id, 5)).to.equal(true)
      expect(await user.verifyHistoricalBalance(id, 150, 0)).to.equal(true)

      id = generateId('user2')
      expect(await user.getBeneficiariesHistoryCount(id)).to.equal(0)

      tree = getRootandProof([0, 5], 0)
      timestamp = 100
      await user.updatePoints(id, tree.rootHash, tree.hexProof, timestamp)
      expect(await user.getBeneficiariesHistoryCount(id)).to.equal(1)
      expect(await user.verifyCurrentBalance(id, 0)).to.equal(true)

      tree = getRootandProof([0, 5], 1)
      timestamp = 50
      await expect(
        user
          .connect(owner)
          .updatePoints(id, tree.rootHash, tree.hexProof, timestamp)
      )
        .to
        .be
        .revertedWith('Time Mismatch. Could not update previous points')
    })
  })
})
