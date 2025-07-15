// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC721 standard from OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// AgriCertificate contract - NFT certificates for milestones
contract AgriCertificate is ERC721, Ownable {
    using Strings for uint256;
    
    // Counter for token IDs
    uint256 private _tokenIdCounter;
    
    // Struct to store certificate data
    struct CertificateData {
        address farmer;           // Address of the farmer
        string cropType;          // Type of crop (tomato, cucumber, onion)
        uint256 milestoneNumber;  // Milestone number (1, 2, or 3)
        string description;       // Description of the milestone
        uint256 timestamp;        // When the certificate was issued
    }
    
    // Mapping from token ID to certificate data
    mapping(uint256 => CertificateData) public certificates;
    
    // Constructor - runs once when contract is deployed
    constructor() ERC721("AgriCertificate", "AGRI-CERT") Ownable(msg.sender) {
        _tokenIdCounter = 1; // Start token IDs from 1
    }
    
    // Function to mint new certificate - only owner can call
    function mintCertificate(
        address farmer,
        string memory cropType,
        uint256 milestoneNumber,
        string memory description
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // Mint the NFT to the farmer
        _safeMint(farmer, tokenId);
        
        // Store certificate data
        certificates[tokenId] = CertificateData({
            farmer: farmer,
            cropType: cropType,
            milestoneNumber: milestoneNumber,
            description: description,
            timestamp: block.timestamp
        });
        
        return tokenId;
    }
    
    // Function to get certificate data
    function getCertificate(uint256 tokenId) public view returns (CertificateData memory) {
        require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
        return certificates[tokenId];
    }
    
    // Function to get total number of certificates
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter - 1;
    }
}