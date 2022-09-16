const { expect } = require('chai')
const { ethers, upgrades } = require('hardhat')

describe('PlanetXGovernor contract', () => {
    let Token, user, owner, addr1
    beforeEach(async () => {
        Token = await ethers.getContractFactory('PlanetXGovernor')
        user = await Token.deploy();
        [owner, addr1] = await ethers.getSigners()
    })

    describe('Deployment', () => {
        it('Should check the Governor contract parameters', async() => {
            expect(await user.votingPeriod()).to.equal(0)
            //expect(await user.votingDelay()).to.equal(0)
            //expect(await user.quorum()).to.equal(blockNumber)
            //expect(await user.proposalThreshold()).to.equal(1)
        })

    })

})