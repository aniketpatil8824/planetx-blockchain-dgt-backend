// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// const { BN } = require('bn.js')
// const { expect, assert } = require('chai')
// const { ethers } = require('hardhat')
// // eslint-disable-next-line no-unused-vars
// const { supply } = new BN('10000000000000')
// // eslint-disable-next-line no-unused-vars
// const { transferAmount } = new BN('1000000000000')
// // const {getRootandProof, generateId} = require('../helper/tree.cjs')

// describe('DGTX Contract', () => {
//   let Dgtx, user, owner, add1, _totalSupply
//   beforeEach(async () => {
//     Dgtx = await ethers.getContractFactory('DGTX')
//     user = await Dgtx.deploy(10000000000000);
//     [owner, add1] = ethers.getSigners()
//   })

//   describe('Deployment', () => {
//     it('should set the right owner', async () => {
//       expect(await user.owner()).to.equal(owner.address)
//     })
//   })

//   describe('DGTX Governance Token', () => {
//     it('should deploy and configure DGTX token', async () => {
//       assert.ok(Dgtx.add1)
//       assert.equal(await Dgtx.name(), 'DGTX PlanetX', 'Token name is incorrect')
//       assert.equal(await Dgtx.symbol(), 'DGTX', 'Token symbol is incorrect')
//       assert.equal((await Dgtx.decimals()).toString(), '18', 'token decimals are incorrect')
//       assert.equal((await Dgtx.totalSupply()).toString(), '10000000000000', 'Token total supply is incorrect')
//     })
//   })
// })
