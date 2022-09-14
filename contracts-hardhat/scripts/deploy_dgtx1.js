const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV1 = await ethers.getContractFactory("DGTX");
  const proxy = await upgrades.deployProxy(BoxV1);
  await proxy.deployed();

  console.log(proxy.address);
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})