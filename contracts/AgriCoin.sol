// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC20 standard from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// AgriCoin contract - inherits from ERC20 and Ownable
contract AgriCoin is ERC20, Ownable {
   
   // Constructor - runs once when contract is deployed
   constructor() ERC20("AgriCoin", "AGRI") Ownable(msg.sender) {
       // Mint 1,000,000 tokens to contract deployer
       _mint(msg.sender, 1000000 * 10**decimals());
   }
   
   // Function to mint new tokens - only owner can call
   function mint(address to, uint256 amount) public onlyOwner {
       _mint(to, amount);
   }
   
   // Function to burn tokens - only owner can call
   function burn(uint256 amount) public onlyOwner {
       _burn(msg.sender, amount);
   }
}