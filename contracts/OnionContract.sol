// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import required contracts
import "./AgriCoin.sol";
import "./AgriCertificate.sol";

// OnionContract - manages onion growing contracts
contract OnionContract {
        
    // Reference to AgriCoin and AgriCertificate contracts
    AgriCoin public agriCoin;
    AgriCertificate public agriCertificate;
    
    // Contract owner
    address public owner;
    
    // Contract counter for unique IDs
    uint256 private contractCounter;
    
    // Milestone structure
    struct Milestone {
        string description;      // What needs to be done
        uint256 deadline;       // When it should be completed
        uint256 payment;        // How much to pay for this milestone
        bool completed;         // Is it done?
        bool approved;          // Is it approved by buyer?
    }
    
    // Main contract structure
    struct GrowingContract {
        uint256 contractId;     // Unique contract ID
        address farmer;         // Farmer's address
        address buyer;          // Buyer's address
        uint256 totalAmount;    // Total payment amount
        uint256 quantity;       // Quantity in kg
        bool isActive;          // Is contract active?
        bool isCompleted;       // Is contract fully completed?
        Milestone[3] milestones; // Array of 3 milestones
    }
    
    // Mapping from contract ID to contract data
    mapping(uint256 => GrowingContract) public contracts;
    
    // Events for logging
    event ContractCreated(uint256 contractId, address farmer, address buyer, uint256 amount);
    event MilestoneCompleted(uint256 contractId, uint256 milestoneIndex);
    event MilestoneApproved(uint256 contractId, uint256 milestoneIndex, uint256 payment);
    event ContractFinished(uint256 contractId);
    
    // Constructor
    constructor(address _agriCoinAddress, address _agriCertificateAddress) {
        agriCoin = AgriCoin(_agriCoinAddress);
        agriCertificate = AgriCertificate(_agriCertificateAddress);
        owner = msg.sender;
        contractCounter = 1;
    }
    
    // Function to create new growing contract
    function createContract(
        address _farmer,
        address _buyer,
        uint256 _totalAmount,
        uint256 _quantity
    ) public returns (uint256) {
        uint256 contractId = contractCounter;
        contractCounter++;
        
        // Create new contract
        GrowingContract storage newContract = contracts[contractId];
        newContract.contractId = contractId;
        newContract.farmer = _farmer;
        newContract.buyer = _buyer;
        newContract.totalAmount = _totalAmount;
        newContract.quantity = _quantity;
        newContract.isActive = true;
        newContract.isCompleted = false;
        
        // Set up milestones for onions (March to August)
        newContract.milestones[0] = Milestone({
            description: "Land preparation and planting",
            deadline: 1679875200, // March 26, 2024
            payment: _totalAmount * 35 / 100, // 35% of total
            completed: false,
            approved: false
        });
        
        newContract.milestones[1] = Milestone({
            description: "Growth monitoring and care",
            deadline: 1684195200, // May 16, 2024
            payment: _totalAmount * 35 / 100, // 35% of total
            completed: false,
            approved: false
        });
        
        newContract.milestones[2] = Milestone({
            description: "Harvest and storage",
            deadline: 1690588800, // July 29, 2024
            payment: _totalAmount * 30 / 100, // 30% of total
            completed: false,
            approved: false
        });
        
        emit ContractCreated(contractId, _farmer, _buyer, _totalAmount);
        return contractId;
    }
    
    // Function for farmer to mark milestone as completed
    function completeMilestone(uint256 _contractId, uint256 _milestoneIndex) public {
        require(_milestoneIndex < 3, "Invalid milestone index");
        require(contracts[_contractId].farmer == msg.sender, "Only farmer can complete milestones");
        require(contracts[_contractId].isActive, "Contract is not active");
        require(!contracts[_contractId].milestones[_milestoneIndex].completed, "Milestone already completed");
        
        contracts[_contractId].milestones[_milestoneIndex].completed = true;
        
        emit MilestoneCompleted(_contractId, _milestoneIndex);
    }
    
    // Function for buyer to approve milestone and trigger payment
    function approveMilestone(uint256 _contractId, uint256 _milestoneIndex) public {
        require(_milestoneIndex < 3, "Invalid milestone index");
        require(contracts[_contractId].buyer == msg.sender, "Only buyer can approve milestones");
        require(contracts[_contractId].milestones[_milestoneIndex].completed, "Milestone not completed yet");
        require(!contracts[_contractId].milestones[_milestoneIndex].approved, "Milestone already approved");
        
        // Mark as approved
        contracts[_contractId].milestones[_milestoneIndex].approved = true;
        
        // Transfer payment to farmer
        uint256 payment = contracts[_contractId].milestones[_milestoneIndex].payment;
        agriCoin.transfer(contracts[_contractId].farmer, payment);
        
        // Mint certificate NFT
        string memory milestoneDesc = contracts[_contractId].milestones[_milestoneIndex].description;
        agriCertificate.mintCertificate(
            contracts[_contractId].farmer,
            "Onion",
            _milestoneIndex + 1,
            milestoneDesc
        );
        
        emit MilestoneApproved(_contractId, _milestoneIndex, payment);
        
        // Check if all milestones are approved
        if (_milestoneIndex == 2) { // Last milestone
            contracts[_contractId].isCompleted = true;
            contracts[_contractId].isActive = false;
            emit ContractFinished(_contractId);
        }
    }
    
    // Function to get contract details
    function getContract(uint256 _contractId) public view returns (GrowingContract memory) {
        return contracts[_contractId];
    }
    
    // Function to get milestone details
    function getMilestone(uint256 _contractId, uint256 _milestoneIndex) public view returns (Milestone memory) {
        require(_milestoneIndex < 3, "Invalid milestone index");
        return contracts[_contractId].milestones[_milestoneIndex];
    }
}