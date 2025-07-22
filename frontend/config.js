// Contract addresses on Sepolia testnet
const CONTRACT_ADDRESSES = {
    AgriCoin: "0xE3b55d7Fc71a5e5315DB62DA69567A4Cf8AE48E7",
    AgriCertificate: "0xC2084811c395503116C1aC2b00086589898b326A",
    TomatoContract: "0xf29F61630af357C7279377C16f0c283caCa88E4f",
    CucumberContract: "0x9b1DE25FcCf4d324323f30606B81ba9352cd1602",
    OnionContract: "0x32a94C50F253fB4e5FFf0a60dacf81eCe3315Dc6",
    AgriMarket: "0x437fbd84B3595BF4C6d47D7fc85213741266d7ef"
};

// Complete ABIs matching the actual smart contracts
const CONTRACT_ABIS = {
    AgriCoin: [
        {
            "inputs": [],
            "name": "name",
            "outputs": [{"name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [{"name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [{"name": "", "type": "uint8"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "view",
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
        },
        {
            "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
            "name": "allowance",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
            "name": "approve",
            "outputs": [{"name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"}],
            "name": "transferFrom",
            "outputs": [{"name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],

    AgriCertificate: [
        {
            "inputs": [],
            "name": "name",
            "outputs": [{"name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [{"name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "owner", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "tokenId", "type": "uint256"}],
            "name": "ownerOf",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "tokenId", "type": "uint256"}],
            "name": "tokenURI",
            "outputs": [{"name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {"name": "_farmer", "type": "address"},
                {"name": "_cropType", "type": "string"},
                {"name": "_quantity", "type": "uint256"},
                {"name": "_quality", "type": "string"}
            ],
            "name": "mintCertificate",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "_tokenId", "type": "uint256"}],
            "name": "getCertificate",
            "outputs": [{"type": "tuple", "components": [
                {"name": "farmer", "type": "address"},
                {"name": "cropType", "type": "string"},
                {"name": "quantity", "type": "uint256"},
                {"name": "quality", "type": "string"},
                {"name": "timestamp", "type": "uint256"}
            ]}],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    
    TomatoContract: [
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "agriCoin",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "agriCertificate",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "", "type": "uint256"}],
            "name": "contracts",
            "outputs": [
                {"name": "contractId", "type": "uint256"},
                {"name": "farmer", "type": "address"},
                {"name": "buyer", "type": "address"},
                {"name": "totalAmount", "type": "uint256"},
                {"name": "quantity", "type": "uint256"},
                {"name": "isActive", "type": "bool"},
                {"name": "isCompleted", "type": "bool"}
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {"name": "_farmer", "type": "address"},
                {"name": "_buyer", "type": "address"}, 
                {"name": "_totalAmount", "type": "uint256"},
                {"name": "_quantity", "type": "uint256"}
            ],
            "name": "createContract",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}],
            "name": "getContract",
            "outputs": [{"type": "tuple", "components": [
                {"name": "contractId", "type": "uint256"},
                {"name": "farmer", "type": "address"},
                {"name": "buyer", "type": "address"},
                {"name": "totalAmount", "type": "uint256"},
                {"name": "quantity", "type": "uint256"},
                {"name": "isActive", "type": "bool"},
                {"name": "isCompleted", "type": "bool"},
                {"name": "milestones", "type": "tuple[3]", "components": [
                    {"name": "description", "type": "string"},
                    {"name": "deadline", "type": "uint256"},
                    {"name": "payment", "type": "uint256"},
                    {"name": "completed", "type": "bool"},
                    {"name": "approved", "type": "bool"}
                ]}
            ]}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "getMilestone",
            "outputs": [{"type": "tuple", "components": [
                {"name": "description", "type": "string"},
                {"name": "deadline", "type": "uint256"},
                {"name": "payment", "type": "uint256"},
                {"name": "completed", "type": "bool"},
                {"name": "approved", "type": "bool"}
            ]}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "completeMilestone",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "approveMilestone",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    
    CucumberContract: [
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "agriCoin",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "", "type": "uint256"}],
            "name": "contracts",
            "outputs": [
                {"name": "contractId", "type": "uint256"},
                {"name": "farmer", "type": "address"},
                {"name": "buyer", "type": "address"},
                {"name": "totalAmount", "type": "uint256"},
                {"name": "quantity", "type": "uint256"},
                {"name": "isActive", "type": "bool"},
                {"name": "isCompleted", "type": "bool"}
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {"name": "_farmer", "type": "address"},
                {"name": "_buyer", "type": "address"}, 
                {"name": "_totalAmount", "type": "uint256"},
                {"name": "_quantity", "type": "uint256"}
            ],
            "name": "createContract",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}],
            "name": "getContract",
            "outputs": [{"type": "tuple", "components": [
                {"name": "contractId", "type": "uint256"},
                {"name": "farmer", "type": "address"},
                {"name": "buyer", "type": "address"},
                {"name": "totalAmount", "type": "uint256"},
                {"name": "quantity", "type": "uint256"},
                {"name": "isActive", "type": "bool"},
                {"name": "isCompleted", "type": "bool"},
                {"name": "milestones", "type": "tuple[3]", "components": [
                    {"name": "description", "type": "string"},
                    {"name": "deadline", "type": "uint256"},
                    {"name": "payment", "type": "uint256"},
                    {"name": "completed", "type": "bool"},
                    {"name": "approved", "type": "bool"}
                ]}
            ]}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "getMilestone",
            "outputs": [{"type": "tuple", "components": [
                {"name": "description", "type": "string"},
                {"name": "deadline", "type": "uint256"},
                {"name": "payment", "type": "uint256"},
                {"name": "completed", "type": "bool"},
                {"name": "approved", "type": "bool"}
            ]}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "completeMilestone",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "approveMilestone",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    
    OnionContract: [
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "agriCoin",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "", "type": "uint256"}],
            "name": "contracts",
            "outputs": [
                {"name": "contractId", "type": "uint256"},
                {"name": "farmer", "type": "address"},
                {"name": "buyer", "type": "address"},
                {"name": "totalAmount", "type": "uint256"},
                {"name": "quantity", "type": "uint256"},
                {"name": "isActive", "type": "bool"},
                {"name": "isCompleted", "type": "bool"}
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {"name": "_farmer", "type": "address"},
                {"name": "_buyer", "type": "address"}, 
                {"name": "_totalAmount", "type": "uint256"},
                {"name": "_quantity", "type": "uint256"}
            ],
            "name": "createContract",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}],
            "name": "getContract",
            "outputs": [{"type": "tuple", "components": [
                {"name": "contractId", "type": "uint256"},
                {"name": "farmer", "type": "address"},
                {"name": "buyer", "type": "address"},
                {"name": "totalAmount", "type": "uint256"},
                {"name": "quantity", "type": "uint256"},
                {"name": "isActive", "type": "bool"},
                {"name": "isCompleted", "type": "bool"},
                {"name": "milestones", "type": "tuple[3]", "components": [
                    {"name": "description", "type": "string"},
                    {"name": "deadline", "type": "uint256"},
                    {"name": "payment", "type": "uint256"},
                    {"name": "completed", "type": "bool"},
                    {"name": "approved", "type": "bool"}
                ]}
            ]}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "getMilestone",
            "outputs": [{"type": "tuple", "components": [
                {"name": "description", "type": "string"},
                {"name": "deadline", "type": "uint256"},
                {"name": "payment", "type": "uint256"},
                {"name": "completed", "type": "bool"},
                {"name": "approved", "type": "bool"}
            ]}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "completeMilestone",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "_contractId", "type": "uint256"}, {"name": "_milestoneIndex", "type": "uint256"}],
            "name": "approveMilestone",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    AgriMarket: [
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{"name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getExchangeRate",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [{"name": "user", "type": "address"}],
            "name": "getAgriCoinBalance",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAvailableAgriCoin",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "buyAgriCoin",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{"name": "amount", "type": "uint256"}],
            "name": "addAgriCoinForSale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawETH",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractAddresses",
            "outputs": [
                {"name": "", "type": "address"},
                {"name": "", "type": "address"},
                {"name": "", "type": "address"},
                {"name": "", "type": "address"},
                {"name": "", "type": "address"}
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractETHBalance",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "view",
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