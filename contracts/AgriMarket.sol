// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import all contracts
import "./AgriCoin.sol";
import "./AgriCertificate.sol";
import "./TomatoContract.sol";
import "./CucumberContract.sol";
import "./OnionContract.sol";

// AgriMarket - main platform contract with AgriCoin exchange
contract AgriMarket {
    
    // Contract addresses
    AgriCoin public agriCoin;
    AgriCertificate public agriCertificate;
    TomatoContract public tomatoContract;
    CucumberContract public cucumberContract;
    OnionContract public onionContract;
    
    address public owner;
    
    // Exchange rate: 1 ETH = 1000 AGRI
    uint256 public constant EXCHANGE_RATE = 1000;
    
    // Events for logging
    event AgriCoinPurchased(address buyer, uint256 ethAmount, uint256 agriAmount);
    
    // Constructor - connect to existing contracts
    constructor(
        address _agriCoin,
        address _agriCertificate,
        address _tomatoContract,
        address _cucumberContract,
        address _onionContract
    ) {
        owner = msg.sender;
        
        // Connect to existing contracts
        agriCoin = AgriCoin(_agriCoin);
        agriCertificate = AgriCertificate(_agriCertificate);
        tomatoContract = TomatoContract(_tomatoContract);
        cucumberContract = CucumberContract(_cucumberContract);
        onionContract = OnionContract(_onionContract);
    }
    
    // Buy AgriCoin with ETH - main exchange function
    function buyAgriCoin() public payable {
        require(msg.value > 0, "Must send ETH to buy AgriCoin");
        
        // Calculate AgriCoin amount: 1 ETH = 1000 AGRI
        uint256 agriAmount = msg.value * EXCHANGE_RATE;
        
        // Check if contract has enough AgriCoin to sell
        uint256 contractBalance = agriCoin.balanceOf(address(this));
        require(contractBalance >= agriAmount, "Not enough AgriCoin in contract");
        
        // Transfer AgriCoin to buyer
        bool success = agriCoin.transfer(msg.sender, agriAmount);
        require(success, "AgriCoin transfer failed");
        
        emit AgriCoinPurchased(msg.sender, msg.value, agriAmount);
    }
    
    // Get current exchange rate
    function getExchangeRate() public pure returns (uint256) {
        return EXCHANGE_RATE;
    }
    
    // Get AgriCoin balance of user
    function getAgriCoinBalance(address user) public view returns (uint256) {
        return agriCoin.balanceOf(user);
    }
    
    // Get contract's AgriCoin balance (how much is available for sale)
    function getAvailableAgriCoin() public view returns (uint256) {
        return agriCoin.balanceOf(address(this));
    }
    
    // Owner can add AgriCoin to the contract for selling
    function addAgriCoinForSale(uint256 amount) public {
        require(msg.sender == owner, "Only owner can add AgriCoin");
        bool success = agriCoin.transferFrom(msg.sender, address(this), amount);
        require(success, "Transfer failed");
    }
    
    // Owner can withdraw ETH from sales
    function withdrawETH() public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(owner).transfer(balance);
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
    
    // Get contract balance in ETH (for transparency)
    function getContractETHBalance() public view returns (uint256) {
        return address(this).balance;
    }
}