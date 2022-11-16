/* eslint-disable no-undef */
const { expect, use } = require('chai')
const { ethers } = require('hardhat')
//const { getRootandProof, generateId } = require('../helper/tree.cjs')
const config = require('../../config/contract.json')

describe('DGTX Contract', () => {
  let Dgtx, user, owner, addr1
  let totalSupply = 210000000000000000000000000n
  beforeEach(async () => {
    Dgtx = await ethers.getContractFactory('DGTX')
    user = await Dgtx.deploy(totalSupply);
    [owner, addr1] = await ethers.getSigners()
  })

  describe('Deployment', () => {
    it('Should check the DGTX token name', async () => {
      expect(await user.name()).to.equal('DGTX PlanetX')
    })
    it('Should check the DGTX token symbol', async () => {
      expect(await user.symbol()).to.equal('DGTX')
    })
    it('Should check the DGTX Token Decimals', async () => {
      expect(await user.decimals()).to.equal(18)
    })
    it('Should check the total Suppy of DGTX Tokens', async () => {
      expect(await user.totalSupply()).to.equal(210000000000000000000000000n)
    })

  })

//   describe('transactions', () => {
//     it('should transfer amount to recepient', async () =>{
//         const owner = config.DGTX_ADDRESS
//         const sender = owner
//         const amount = 1000
//         const recepient = addr1
//         expect(await user.transfer(sender, amount, recepient)).toString();
//     })
//   })

  
})
