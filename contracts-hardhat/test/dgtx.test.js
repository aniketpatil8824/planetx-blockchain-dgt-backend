// /* eslint-disable no-undef */
// const { BN } = require('bn.js')
// const {expect, assert} = require('chai')
// const {ethers} = require('hardhat')
// const {supply} = new BN('210000000000000000000000000')
// const {transferAmount} = new BN('1000000000000') 
// //const {getRootandProof, generateId} = require('../helper/tree.cjs')

// describe('DGTX Contract', () => {
//     let Dgtx, user, owner, add1
//     beforeEach(async () => {
//         Dgtx = await ethers.getContractFactory('DGTX')
//         user = await Dgtx.deploy();
//         [owner, add1] = ethers.getSigners()
//     })

//     describe('Deployment', () => {
//         it('should set the right owner', async() => {
//             expect(await user.owner()).to.equal(owner.address)
//         })
//     })

//     describe('DGTX Governance Token', () => {
//         it("should deploy and configure DGTX token", async() => {
//             assert.ok(Dgtx.address)
//             assert.equal(await Dgtx.name(), "DGTX PlanetX", "Token name is incorrect")
//             assert.equal(await Dgtx.symbol(), "DGTX", "Token symbol is incorrect")
//             assert.equal((await Dgtx.decimals()).toString(), "18", "token decimals are incorrect")
//             assert.equal((await Dgtx.totalSupply()).toString(), "210000000000000000000000000", "Token total supply is incorrect")
//       })
//     })
// }