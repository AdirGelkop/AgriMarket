# AgriMarket - Blockchain Agriculture Platform

A decentralized platform connecting farmers and retailers through smart contracts with milestone-based payments and NFT certificates.

## 🌱 Project Overview

AgriMarket enables farmers to sell their crops directly to retailers using blockchain technology. The platform ensures trust through milestone tracking, automatic payments, and digital certificates.

### Key Features
- **Milestone-based payments**: Farmers receive payments as they complete growing stages
- **Digital certificates**: NFT certificates issued for each completed milestone
- **Multiple crops**: Support for tomatoes, cucumbers, and onions
- **Transparent tracking**: All transactions recorded on blockchain

## 🏗️ Architecture

### Smart Contracts
- **AgriCoin.sol** - ERC20 token for platform payments
- **AgriCertificate.sol** - ERC721 NFT certificates for milestones
- **TomatoContract.sol** - Manages tomato growing contracts (Mar-Sep)
- **CucumberContract.sol** - Manages cucumber growing contracts (Apr-Aug)
- **OnionContract.sol** - Manages onion growing contracts (Feb-Jul)
- **AgriMarket.sol** - Main platform contract connecting all services

### Payment Structure
Each crop contract has 3 milestones with different payment distributions:
- **Tomatoes**: 30% → 40% → 30%
- **Cucumbers**: 25% → 45% → 30%
- **Onions**: 35% → 35% → 30%

## 🔄 How It Works

1. **Contract Creation**: Retailer creates a contract specifying crop type, quantity, and total payment
2. **Milestone Completion**: Farmer marks milestones as completed (seeding, growing, harvest)
3. **Verification**: Retailer approves completed milestones
4. **Payment & Certificate**: Automatic payment in AgriCoin + NFT certificate issued
5. **Contract Completion**: All milestones completed = contract fulfilled

## 🛠️ Technology Stack

- **Blockchain**: Ethereum (Sepolia Testnet)
- **Smart Contracts**: Solidity ^0.8.0
- **Standards**: ERC20 (tokens), ERC721 (NFTs)
- **Development**: Hardhat, OpenZeppelin
- **Frontend**: HTML5, CSS3, JavaScript (Web3.js)

## 📁 Project Structure

```
AgriMarket/
├── contracts/          # Smart contracts
│   ├── AgriCoin.sol
│   ├── AgriCertificate.sol
│   ├── TomatoContract.sol
│   ├── CucumberContract.sol
│   ├── OnionContract.sol
│   └── AgriMarket.sol
├── frontend/           # Web interface
├── scripts/            # Deployment scripts
└── docs/              # Documentation
```

## 🎯 Project Goals

- **Trust**: Eliminate intermediaries through smart contracts
- **Transparency**: All transactions visible on blockchain
- **Fair Payment**: Milestone-based payments protect both parties
- **Proof of Quality**: NFT certificates provide verifiable crop history
- **Efficiency**: Direct farmer-to-retailer transactions

## 🚀 Current Status

✅ Smart contracts developed and tested  
🔄 Ready for deployment to Sepolia testnet  
⏳ Frontend development in progress
