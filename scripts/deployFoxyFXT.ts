import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const FoxyFXT = await ethers.getContractFactory("FoxyFXT");
  const foxyFXT = await FoxyFXT.deploy();

  await foxyFXT.deployed();

  console.log("FoxyFXT deployed to:", foxyFXT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
