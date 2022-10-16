import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-ethers';
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: process.env.QWERTY_SEPOLIA,
      accounts: [process.env.QWERTY_MATSI!],
    }
  },
  etherscan: {
    apiKey: process.env.QWERTY_FOXY_FXT
  }
};

export default config;
