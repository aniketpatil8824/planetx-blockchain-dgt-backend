// const {expect} = require('chai');
// const { ethers } = require('ethers');
// const { default: isTaxID } = require('validator/lib/isTaxID');

// describe('Token Contract', () => {
//     let Token, token, owner, addr1, addr2;

//     beforeEach(async () => {
//         Token = await ethers.getContractFactory('Token');
//         token = await Token.deploy();
//         [owner, addr1, addr2, _] = await ethers.getSigners();
//     });

//     describe('Deployment', () => {
//         it('Should set the right owner', async() => {
//             expect(await token.owner()).to.equal(owner.address);
//         });

//         it('Should assign the total supply of tokens to the owner', async () => {
//             const ownerBalance = await token.balanceof(owner.address);
//             expect(await token.totalSupply()).to.equal(ownerBalance);
//         });

//     });
// };
