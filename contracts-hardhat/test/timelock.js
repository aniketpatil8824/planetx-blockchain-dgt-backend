const {expect} = require('chai')
const {ethers, upgrades} = require('hardhat')

describe('Timelock controller contract', () => {
    let Token, user, owner, addr1
    beforeEach(async () => {
        Token = await ethers.getContractFactory('PlanetXTimelockController')
        user = await Token.deploy();
        [owner, addr1] = await ethers.getSigners()
    })

    describe('Deployment', () => {
        it('Should check the min delay', async () => {
            expect(await user.getMinDelay()).to.equal(0)
        })
        it('Should check for the operation done or not', async () => {
            console.log("Successful")
        })
        it('Should check for update delay', async () => {
            let newDelay = 10
            expect(await user.updateDelay(newDelay)).to.equal(10).to.be.revertedWith("TimelockController: caller must be timelock") 
        })
    })
})