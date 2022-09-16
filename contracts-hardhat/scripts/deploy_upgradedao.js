const { expect } = require('chai');
const { ethers, upgrades } = require('hardhat');

const config = require('../../config/contract.json')

const saveToConfig = require('../utils/saveToConfig')

async function main(){
    const gov = await ethers.getContractFactory('PlanetXGovernor');
    console.log("Governor is upgrading.....");
    const govAddress = config.PlanetXGovernor_ADDRESS
    await upgrades.upgradeProxy(govAddress, gov);
    console.log("Governor is upgraded wrt DGTX");

    const timelock = await ethers.getContractFactory('PlanetXTimelockController');
    console.log("Timelock is upgrading....");
    const timelockAddress = config.PlanetXTimelockController_ADDRESS
    await upgrades.upgradeProxy(timelockAddress, timelock);
    console.log("Timelock has been upgraded wrt DGTX");
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

