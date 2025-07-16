const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
   console.log("Starting deployment to Sepolia TestNet...");
   
   // Get the deployer account
   const [deployer] = await ethers.getSigners();
   console.log("Deploying contracts with account:", deployer.address);
   
   // Check balance
   const balance = await deployer.getBalance();
   console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");
   
   // Deploy AgriCoin first
   console.log("\n1. Deploying AgriCoin...");
   const AgriCoin = await ethers.getContractFactory("AgriCoin");
   const agriCoin = await AgriCoin.deploy();
   await agriCoin.deployed();
   console.log("AgriCoin deployed to:", agriCoin.address);
   
   // Deploy AgriCertificate
   console.log("\n2. Deploying AgriCertificate...");
   const AgriCertificate = await ethers.getContractFactory("AgriCertificate");
   const agriCertificate = await AgriCertificate.deploy();
   await agriCertificate.deployed();
   console.log("AgriCertificate deployed to:", agriCertificate.address);
   
   // Deploy TomatoContract
   console.log("\n3. Deploying TomatoContract...");
   const TomatoContract = await ethers.getContractFactory("TomatoContract");
   const tomatoContract = await TomatoContract.deploy(agriCoin.address, agriCertificate.address);
   await tomatoContract.deployed();
   console.log("TomatoContract deployed to:", tomatoContract.address);
   
   // Deploy CucumberContract
   console.log("\n4. Deploying CucumberContract...");
   const CucumberContract = await ethers.getContractFactory("CucumberContract");
   const cucumberContract = await CucumberContract.deploy(agriCoin.address, agriCertificate.address);
   await cucumberContract.deployed();
   console.log("CucumberContract deployed to:", cucumberContract.address);
   
   // Deploy OnionContract
   console.log("\n5. Deploying OnionContract...");
   const OnionContract = await ethers.getContractFactory("OnionContract");
   const onionContract = await OnionContract.deploy(agriCoin.address, agriCertificate.address);
   await onionContract.deployed();
   console.log("OnionContract deployed to:", onionContract.address);
   
   // Save contract addresses to file
   const addresses = {
       network: "sepolia",
       deployedAt: new Date().toISOString(),
       contracts: {
           AgriCoin: agriCoin.address,
           AgriCertificate: agriCertificate.address,
           TomatoContract: tomatoContract.address,
           CucumberContract: cucumberContract.address,
           OnionContract: onionContract.address
       }
   };
   
   // Write to addresses.json
   fs.writeFileSync("addresses.json", JSON.stringify(addresses, null, 2));
   console.log("\n✅ All contracts deployed successfully!");
   console.log("📝 Contract addresses saved to addresses.json");
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error("❌ Deployment failed:", error);
       process.exit(1);
   });