const {expect} = require('chai');
const {ethers} = require('hardhat');
const { default: isTaxID } = require('validator/lib/isTaxID');
const config = require('../../config/contract.json')

describe('Vesting Contract', () => {
    let Token, token, addr1, addr2;
    beforeEach (async () => {
        Token = await ethers.getContractFactory('TokenVesting');
        token = await Token.deploy(config.TokenVesting_ADDRESS);
        [addr1, addr2] = await ethers.getSigners();
    })

    describe('Token Vesting Deployment', () => {
        it('Get vesting schedules count by beneficiary', async () => {
            expect(await token.getVestingSchedulesCountByBeneficiary(token.address)).to.equal(0)
            //expect(await token.getVestingIdAtIndex(0)).to.equal(0)
            //expect(await token.getVestingScheduleByAddressAndIndex(token.address, 0)).to.equal(0)
        })
        it('Get vesting token schedules count', async () => {
            expect(await token.getVestingSchedulesCount()).to.equal(0)
        })
        it('Get vesting schedules total amount', async () => {
            expect(await token.getVestingSchedulesTotalAmount()).to.equal(0)
        })
        it('Get address of the ERC-20 Vesting Token contract', async () => {
            expect(await token.getToken())
        })
        it('Get current time', async () => {
            expect(await token.getTime())
        })
    })
})