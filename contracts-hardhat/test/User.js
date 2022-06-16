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
    it('Should set the initial admin as the owner', async () => {
      expect(await user.isAdmin(owner.address)).to.equal(true)
    })
  })

  describe('Transactions', () => {
    it('Should Create and Update update status of Users', async () => {
      await user.createUser(addr1.address, 0)
      expect(await user.getStatus(addr1.address)).to.equal(true)
      expect(await user.isMerchant(addr1.address)).to.equal(true)

      await user.updateStatus(addr1.address)
      expect(await user.getStatus(addr1.address)).to.equal(false)
    })

    it('Should fail if user not created', async () => {
      await expect(
        user
          .connect(owner)
          .updateStatus(addr2.address)
      )
        .to
        .be
        .revertedWith('Account does not exists')
    })

    it('Should Update the admin Power to new address', async () => {
      await user.updateAdmin(addr1.address)
      expect(await user.isAdmin(addr1.address)).to.equal(true)
      expect(await user.isAdmin(owner.address)).to.equal(false)
    })

    it('Should not update the admin address', async () => {
      await expect(
        user
          .connect(addr1)
          .updateAdmin(addr2.address)
      )
        .to
        .be
        .revertedWith('Restricted to admins')

      await expect(
        user
          .connect(owner)
          .updateAdmin(owner.address)
      )
        .to
        .be
        .revertedWith('This is already the admin user')

      await user.createUser(addr1.address, 1)
      await expect(
        user
          .connect(owner)
          .updateAdmin(addr1.address)
      )
        .to
        .be
        .revertedWith('Account already exists as user')
    })

    it('Should fail while creating/updating an account', async () => {
      await expect(
        user
          .connect(addr1)
          .createUser(addr2.address, 1)
      )
        .to
        .be
        .revertedWith('Restricted to admins')
      await user.createUser(addr1.address, 1)
      await expect(
        user
          .connect(owner)
          .createUser(addr1.address, 0)
      )
        .to
        .be
        .revertedWith('Account already exists as user')

      await expect(
        user
          .connect(addr2)
          .updateStatus(addr1.address)
      )
        .to
        .be
        .revertedWith('Restricted to admins')
    })
  })
})
