// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// const { expect } = require('chai')
// const { ethers } = require('ethers')
// // eslint-disable-next-line no-unused-vars
// const { default: isTaxID } = require('validator/lib/isTaxID')

// describe('Test Contract', () => {
//   let Token, token, owner, addr1, addr2, _totalSupply

//   beforeEach(async () => {
//     Token = await ethers.ContractFactory('DGTX')
//     token = await Token.deploy(_totalSupply);
//     [owner, addr1, addr2, _] = await ethers.getSigners()
//   })

//   describe('Deployment', () => {
//     it('Should set the right token', async () => {
//       //expect(await token.owner()).to.equal(owner.addr1)
//       expect(await token.name()).to.equal('DGTX PlanetX')
//     })

//     it('Should assign the total supply of tokens to the owner', async () => {
//       const ownerBalance = await token.balanceof(owner.addr1)
//       expect(await token.totalSupply()).to.equal(ownerBalance)
//     })
//   })
// })
