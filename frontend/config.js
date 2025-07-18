// Contract addresses on Sepolia testnet
const CONTRACT_ADDRESSES = {
    AgriCoin: "0x98C1D042206d844Ee13b4c41FfA8D59dfd3F85e9",
    AgriCertificate: "0xDC7F26E092Ea61f82f574d8Dd7a2AcC61D861712",
    TomatoContract: "0x056b3Da815124AE59C729FF10AA4e5a140A7B942",
    CucumberContract: "0xB84F49B9624350437d6e33EB8ac84A253EEFd8DC",
    OnionContract: "0x009b332D1d1FF848e64570b2d8b9533a67a58ce6",
    AgriMarket: "0x" // Will be added if needed
};

// Simplified ABIs for the contracts we need
const CONTRACT_ABIS = {
    AgriCoin: [
        {
            "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
            "name": "approve",
            "outputs": [{"name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "account", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"}],
            "name": "transfer",
            "outputs": [{"name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    
    TomatoContract: [
        {
            "inputs": [{"type": "uint256", "name": "quantity"}, {"type": "uint256", "name": "pricePerKg"}],
            "name": "createContract",
            "type": "function"
        },
        {
            "inputs": [{"type": "uint256", "name": "contractId"}],
            "name": "purchaseContract",
            "type": "function"
        },
        {
            "inputs": [{"type": "uint256", "name": "contractId"}, {"type": "uint256", "name": "milestone"}],
            "name": "approveMilestone",
            "type": "function"
        },
        {
            "inputs": [{"type": "uint256", "name": "contractId"}],
            "name": "getContract",
            "outputs": [{"type": "tuple", "components": [
                {"type": "address", "name": "farmer"},
                {"type": "address", "name": "buyer"},
                {"type": "uint256", "name": "quantity"},
                {"type": "uint256", "name": "pricePerKg"},
                {"type": "bool", "name": "isActive"}
            ]}],
            "type": "function"
        }
    ],
    
    CucumberContract: [
        {
            "inputs": [{"type": "uint256", "name": "quantity"}, {"type": "uint256", "name": "pricePerKg"}],
            "name": "createContract",
            "type": "function"
        },
        {
            "inputs": [{"type": "uint256", "name": "contractId"}],
            "name": "purchaseContract",
            "type": "function"
        },
        {
            "inputs": [{"type": "uint256", "name": "contractId"}, {"type": "uint256", "name": "milestone"}],
            "name": "approveMilestone",
            "type": "function"
        }
    ],
    
    OnionContract: [
        {
            "inputs": [{"type": "uint256", "name": "quantity"}, {"type": "uint256", "name": "pricePerKg"}],
            "name": "createContract",
            "type": "function"
        },
        {
            "inputs": [{"type": "uint256", "name": "contractId"}],
            "name": "purchaseContract",
            "type": "function"
        },
        {
            "inputs": [{"type": "uint256", "name": "contractId"}, {"type": "uint256", "name": "milestone"}],
            "name": "approveMilestone",
            "type": "function"
        }
    ]
};

// Sepolia network configuration
const NETWORK_CONFIG = {
    chainId: '0xaa36a7', // 11155111 in hex
    chainName: 'Sepolia Test Network',
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    blockExplorerUrls: ['https://sepolia.etherscan.io']
};