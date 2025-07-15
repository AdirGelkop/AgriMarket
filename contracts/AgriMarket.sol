// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import all contracts
import "./AgriCoin.sol";
import "./AgriCertificate.sol";
import "./TomatoContract.sol";
import "./CucumberContract.sol";
import "./OnionContract.sol";

// AgriMarket - main platform contract
contract AgriMarket {
    
    // Contract addresses
    AgriCoin public agriCoin;
    AgriCertificate public agriCertificate;
    TomatoContract public tomatoContract;
    CucumberContract public cucumberContract;
    OnionContract public onionContract;
    
    address public owner;
    
    // Constructor - deploy and connect all contracts
    constructor() {
        owner = msg.sender;
        
        // Deploy all contracts
        agriCoin = new AgriCoin();
        agriCertificate = new AgriCertificate();
        tomatoContract = new TomatoContract(address(agriCoin), address(agriCertificate));
        cucumberContract = new CucumberContract(address(agriCoin), address(agriCertificate));
        onionContract = new OnionContract(address(agriCoin), address(agriCertificate));
    }
    
    // Get all contract addresses
    function getContractAddresses() public view returns (
        address, address, address, address, address
    ) {
        return (
            address(agriCoin),
            address(agriCertificate),
            address(tomatoContract),
            address(cucumberContract),
            address(onionContract)
        );
    }
}