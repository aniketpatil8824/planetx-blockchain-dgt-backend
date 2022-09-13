const { ethers, upgrades } = require("hardhat");

const saveToConfig = require('../utils/saveToConfig')

async function main() {
   //const gas = await ethers.provider.getGasPrice()
  //  const V1contract = await ethers.getContractFactory("DGTX");
  //  console.log("Deploying DGTXcontract...");
  //  const v1contract = await upgrades.deployProxy(V1contract, [10], {
  //     gasPrice: gas, 
  //     initializer: "initialvalue",
  //  });
  //  await v1contract.deployed();
  //  console.log("V1 Contract deployed to:", v1contract.address);

   const gas = await ethers.provider.getGasPrice()
   const User = await ethers.getContractFactory('DGTX')
   const userABI = (await artifacts.readArtifact('DGTX')).abi
   await saveToConfig('PlanetXGovernor', 'ABI', userABI)
   const u = await upgrades.deployProxy(User, [10], {
     gasPrice: gas, 
     initializer: "initialvalue",
   });
   await u.deployed()

   await saveToConfig('DGTX', 'ADDRESS', u.address)
   console.log('DGTX contract deployed to:', u.address)
}


main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });


 