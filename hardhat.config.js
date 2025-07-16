require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

// Hardhat configuration for AgriMarket contracts
module.exports = {
 solidity: "0.8.20",
 networks: {
   sepolia: {
     url: process.env.SEPOLIA_URL || "",
     accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
   },
 },
};