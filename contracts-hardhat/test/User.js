/* eslint-disable no-undef */
const { expect } = require('chai')
const { ethers, upgrades } = require('hardhat')

describe('User Contract', () => {
  let Token, token, User, user, owner, addr1, addr2
  beforeEach(async () => {
    Token = await ethers.getContractFactory('Token')
    token = await Token.deploy('DGT Token', 'DGT', 100000000)
    User = await ethers.getContractFactory('User')
    user = await upgrades.deployProxy(User, [token.address]);
    [owner, addr1, addr2] = await ethers.getSigners()
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await user.owner()).to.equal(owner.address)
    })
    it('Should get the token address of the token correct', async () => {
      expect(await user.getToken()).to.equal(token.address)
    })
  })

  describe('Transactions', () => {
    it('Should Create/Update New/Existing Users', async () => {
      await user.createUser(addr1.address, true, 1)
      const getUser = await user.getUser(addr1.address)
      expect(getUser.initialized).to.equal(true)
      expect(getUser.isActive).to.equal(true)
      expect(getUser.role).to.equal(1)

      await user.updateStatus(addr1.address, false)
      const updatedUser = await user.getUser(addr1.address)
      expect(updatedUser.initialized).to.equal(true)
      expect(updatedUser.isActive).to.equal(false)
    })

    it('Should fail if user not created', async () => {
      await expect(
        user
          .connect(owner)
          .updateStatus(addr2.address, 2)
      )
        .to
        .be
        .revertedWith('User does not exists')
    })

    it('Should not let other users to create/update other than owner', async () => {
      await expect(
        user
          .connect(addr1)
          .createUser(addr2.address, true, 1)
      )
        .to
        .be
        .revertedWith('Ownable: caller is not the owner')
      await user.createUser(addr1.address, true, 1)
      await expect(
        user
          .connect(addr2)
          .updateStatus(addr1.address, false)
      )
        .to
        .be
        .revertedWith('Ownable: caller is not the owner')
    })
  })
})
