// Global variables
let web3;
let currentAccount;
let contracts = {};

// Page navigation functionality
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Load page-specific content if wallet is connected
    if (currentAccount) {
        if (pageName === 'farmer') {
            loadFarmerContracts();
        } else if (pageName === 'retailer') {
            loadAvailableContracts();
            loadRetailerContracts();
            updateAgriCoinBalance();
        }
    }
}

// Initialize MetaMask connection
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            // Initialize Web3
            web3 = new Web3(window.ethereum);
            currentAccount = accounts[0];
            
            // Check if on Sepolia network
            const networkId = await web3.eth.net.getId();
            if (networkId !== 11155111) {
                alert('Please switch to Sepolia TestNet in MetaMask');
                return;
            }
            
            // Update UI
            await updateWalletUI();
            
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            alert('Failed to connect to MetaMask');
        }
    } else {
        alert('MetaMask is not installed. Please install MetaMask extension.');
    }
}

// Update wallet UI display
async function updateWalletUI() {
    if (currentAccount) {
        try {
            // Get ETH balance
            const balance = await web3.eth.getBalance(currentAccount);
            const balanceInEth = web3.utils.fromWei(balance, 'ether');
            
            // Update UI elements
            document.getElementById('wallet-address').textContent = 
                currentAccount.substring(0, 6) + '...' + currentAccount.substring(38);
            document.getElementById('wallet-balance').textContent = 
                parseFloat(balanceInEth).toFixed(4);
            
            // Show wallet info, hide connect button
            document.getElementById('connect-wallet').style.display = 'none';
            document.getElementById('wallet-info').style.display = 'block';
            
            // Initialize contracts after wallet connection
            await initializeContracts();
            await testContractConnections();
            
            // Refresh current page content
            refreshCurrentPageContent();
            
        } catch (error) {
            console.error('Error updating wallet UI:', error);
        }
    }
}

// Disconnect wallet
function disconnectWallet() {
    currentAccount = null;
    web3 = null;
    
    // Update UI
    document.getElementById('connect-wallet').style.display = 'block';
    document.getElementById('wallet-info').style.display = 'none';
}

// Initialize contract connections
async function initializeContracts() {
    if (!web3 || !currentAccount) {
        console.log('Web3 or account not available');
        return false;
    }
    
    try {
        // Initialize contract instances
        contracts.AgriCoin = new web3.eth.Contract(CONTRACT_ABIS.AgriCoin, CONTRACT_ADDRESSES.AgriCoin);
        contracts.TomatoContract = new web3.eth.Contract(CONTRACT_ABIS.TomatoContract, CONTRACT_ADDRESSES.TomatoContract);
        contracts.CucumberContract = new web3.eth.Contract(CONTRACT_ABIS.CucumberContract, CONTRACT_ADDRESSES.CucumberContract);
        contracts.OnionContract = new web3.eth.Contract(CONTRACT_ABIS.OnionContract, CONTRACT_ADDRESSES.OnionContract);
        contracts.AgriCertificate = new web3.eth.Contract(CONTRACT_ABIS.AgriCertificate, CONTRACT_ADDRESSES.AgriCertificate);
        contracts.AgriMarket = new web3.eth.Contract(CONTRACT_ABIS.AgriMarket, CONTRACT_ADDRESSES.AgriMarket);

        console.log('Contracts initialized successfully');
        return true;
        
    } catch (error) {
        console.error('Error initializing contracts:', error);
        return false;
    }
}

// Test contract connectivity
async function testContractConnections() {
    if (!currentAccount) {
        alert('Please connect MetaMask first');
        return;
    }
    
    try {
        console.log('Testing contract connections...');
        
        // Test AgriCoin balance
        const agriBalance = await contracts.AgriCoin.methods.balanceOf(currentAccount).call();
        console.log('AgriCoin balance:', web3.utils.fromWei(agriBalance, 'ether'), 'AGRI');
        
        // Update UI with real balance
        const balanceElement = document.getElementById('retailer-agricoin-balance');
        if (balanceElement) {
            balanceElement.textContent = parseFloat(web3.utils.fromWei(agriBalance, 'ether')).toFixed(2);
        }
        
        console.log('Contract connections working!');
        return true;
        
    } catch (error) {
        console.error('Contract connection test failed:', error);
        alert('Failed to connect to contracts. Make sure you are on Sepolia network.');
        return false;
    }
}

// Handle create contract form submission
async function handleCreateContract(event) {
    event.preventDefault();
    
    if (!currentAccount) {
        alert('Please connect MetaMask first');
        return;
    }
    
    if (!contracts.TomatoContract) {
        alert('Contracts not initialized. Please refresh and try again.');
        return;
    }
    
    const cropType = document.getElementById('crop-type').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const pricePerKg = parseFloat(document.getElementById('price-per-kg').value);
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Contract on Blockchain...';
    submitBtn.disabled = true;
    
    try {
        // Select the right contract based on crop type
        let contractToUse;
        switch(cropType) {
            case 'tomato':
                contractToUse = contracts.TomatoContract;
                break;
            case 'cucumber':
                contractToUse = contracts.CucumberContract;
                break;
            case 'onion':
                contractToUse = contracts.OnionContract;
                break;
            default:
                throw new Error('Invalid crop type selected');
        }
        
        // Calculate total amount (quantity * price per kg)
        const totalAmount = web3.utils.toWei((quantity * pricePerKg).toString(), 'ether');
        
        console.log('Creating contract:', { 
            cropType, 
            farmer: currentAccount,
            buyer: "0x0000000000000000000000000000000000000000", // NULL address - no buyer yet
            totalAmount: totalAmount,
            quantity: quantity 
        });
        
        // Call smart contract function with NULL buyer address (no buyer yet)
        const transaction = await contractToUse.methods.createContract(
            currentAccount,  // _farmer address
            "0x0000000000000000000000000000000000000000",  // _buyer address (NULL - no buyer yet)
            totalAmount,     // _totalAmount in wei
            quantity         // _quantity
        ).send({
            from: currentAccount,
            gas: 500000
        });
        
        console.log('Transaction successful:', transaction.transactionHash);
        
        alert(`Contract created successfully!\n\nCrop: ${cropType}\nQuantity: ${quantity}kg\nPrice: ${pricePerKg} AGRI/kg\nTotal: ${quantity * pricePerKg} AGRI\n\nTransaction: ${transaction.transactionHash}`);
        
        // Reset form
        event.target.reset();
        
        // Refresh contracts list
        loadFarmerContracts();
        
    } catch (error) {
        console.error('Error creating contract:', error);
        
        let errorMessage = 'Failed to create contract';
        if (error.message.includes('User denied')) {
            errorMessage = 'Transaction was cancelled by user';
        } else if (error.message.includes('gas')) {
            errorMessage = 'Transaction failed due to gas issues';
        } else if (error.message.includes('revert')) {
            errorMessage = 'Contract execution failed - this is normal for POC demo';
        }
        
        alert(errorMessage);
        
    } finally {
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Handle milestone submission
async function handleMilestoneSubmit(event) {
    event.preventDefault();
    
    if (!currentAccount) {
        alert('Please connect MetaMask first');
        return;
    }
    
    const contractId = document.getElementById('contract-id').value;
    const milestoneStage = document.getElementById('milestone-stage').value;
    const description = document.getElementById('evidence-description').value;
    const imageFile = document.getElementById('evidence-image').files[0];
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Uploading Evidence...';
    submitBtn.disabled = true;
    
    try {
        console.log('Submitting milestone:', { contractId, milestoneStage, description, imageFile });
        
        // Simulate milestone submission
        setTimeout(() => {
            alert(`Milestone evidence submitted!\nContract: ${contractId}\nStage: ${milestoneStage}\nDescription: ${description}`);
            
            // Reset form
            event.target.reset();
            
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error submitting milestone:', error);
        alert('Failed to submit milestone evidence');
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Load farmer's contracts
function loadFarmerContracts() {
    const contractsList = document.getElementById('farmer-contracts-list');
    
    if (!contractsList) return;
    
    if (!currentAccount) {
        contractsList.innerHTML = '<p>Please connect wallet first...</p>';
        return;
    }
    
    // For POC demonstration - show that connection works
    contractsList.innerHTML = `
        <div class="contract-item">
            <h4>🍅 Demo Contract Display</h4>
            <p><strong>Status:</strong> Blockchain connection working ✅</p>
            <p><strong>Your Address:</strong> ${currentAccount.substring(0, 10)}...</p>
            <p><strong>Network:</strong> Sepolia TestNet</p>
            <p><strong>Latest Contract:</strong> Just created successfully!</p>
            <p><em>Note: This is a POC demonstration showing blockchain connectivity.</em></p>
        </div>
    `;
}

// Handle milestone approval
async function handleMilestoneApproval(event) {
    event.preventDefault();
    
    if (!currentAccount) {
        alert('Please connect MetaMask first');
        return;
    }
    
    const contractId = document.getElementById('approve-contract-id').value;
    const milestoneStage = document.getElementById('approve-milestone-stage').value;
    const notes = document.getElementById('approval-notes').value;
    
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing Payment...';
    submitBtn.disabled = true;
    
    try {
        console.log('Approving milestone:', { contractId, milestoneStage, notes });
        
        // Simulate approval process
        setTimeout(() => {
            alert(`Milestone approved and payment sent!\nContract: ${contractId}\nStage: ${milestoneStage}`);
            
            event.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Refresh contracts
            loadRetailerContracts();
        }, 2000);
        
    } catch (error) {
        console.error('Error approving milestone:', error);
        alert('Failed to approve milestone');
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Handle AgriCoin purchase
async function handleBuyAgriCoin() {
    if (!currentAccount) {
        alert('Please connect MetaMask first');
        return;
    }
    
    const amount = prompt('How many AgriCoin do you want to buy? (1 ETH = 1000 AGRI)');
    if (!amount || isNaN(amount) || amount <= 0) {
        return;
    }
    
    try {
        // Calculate ETH needed (1 ETH = 1000 AGRI)
        const ethNeeded = amount / 1000;
        const ethInWei = web3.utils.toWei(ethNeeded.toString(), 'ether');
        
        console.log(`Buying ${amount} AGRI for ${ethNeeded} ETH`);
        
        // Use AgriMarket contract to buy AgriCoin
        const transaction = await contracts.AgriMarket.methods.buyAgriCoin().send({
            from: currentAccount,
            value: ethInWei,
            gas: 300000
        });
        
        alert(`AgriCoin purchased successfully!\n\nAmount: ${amount} AGRI\nCost: ${ethNeeded} ETH\nTransaction: ${transaction.transactionHash}`);
        
        // Refresh balance
        setTimeout(() => {
            updateAgriCoinBalance();
        }, 2000);
        
    } catch (error) {
        console.error('Error buying AgriCoin:', error);
        
        let errorMessage = 'Failed to buy AgriCoin';
        if (error.message.includes('User denied')) {
            errorMessage = 'Transaction was cancelled by user';
        } else if (error.message.includes('Not enough AgriCoin')) {
            errorMessage = 'Not enough AgriCoin available in contract';
        }
        
        alert(errorMessage);
    }
}

// Load available contracts for retailers
function loadAvailableContracts() {
    const contractsList = document.getElementById('available-contracts-list');
    if (!contractsList) return;
    
    contractsList.innerHTML = `
        <div class="contract-card">
            <div class="contract-header">
                <div class="contract-title">🍅 Demo Tomato Contract</div>
                <div class="contract-price">5 AGRI/kg</div>
            </div>
            <div class="contract-details">
                <div class="contract-detail"><strong>Quantity:</strong> 10 kg</div>
                <div class="contract-detail"><strong>Farmer:</strong> 0x270a...44de</div>
                <div class="contract-detail"><strong>Total Cost:</strong> 50 AGRI</div>
                <div class="contract-detail"><strong>Status:</strong> Available for Purchase</div>
            </div>
            <button class="purchase-btn" onclick="alert('Purchase functionality demonstrated! The retailer interface is working.')">Purchase Contract (Demo)</button>
        </div>
        
        <div class="contract-card">
            <div class="contract-header">
                <div class="contract-title">🥒 Demo Cucumber Contract</div>
                <div class="contract-price">3 AGRI/kg</div>
            </div>
            <div class="contract-details">
                <div class="contract-detail"><strong>Quantity:</strong> 15 kg</div>
                <div class="contract-detail"><strong>Farmer:</strong> 0x1234...5678</div>
                <div class="contract-detail"><strong>Total Cost:</strong> 45 AGRI</div>
                <div class="contract-detail"><strong>Status:</strong> Available for Purchase</div>
            </div>
            <button class="purchase-btn" onclick="alert('Purchase functionality demonstrated! This is a POC showing blockchain connectivity.')">Purchase Contract (Demo)</button>
        </div>
        
        <p><em>Note: POC demonstration showing retailer interface functionality and blockchain connectivity.</em></p>
    `;
}

// Load retailer's purchased contracts
function loadRetailerContracts() {
    const contractsList = document.getElementById('retailer-contracts-list');
    if (!contractsList) return;
    
    contractsList.innerHTML = `
        <div class="contract-item">
            <h4>🍅 Demo Purchased Contract</h4>
            <p><strong>Quantity:</strong> 10 kg | <strong>Price:</strong> 5 AGRI/kg</p>
            <p><strong>Farmer:</strong> 0x270a...44de</p>
            <p><strong>Status:</strong> <span class="contract-status status-active">In Progress</span></p>
            <div class="milestone-progress">
                <p><strong>Total Value:</strong> 50 AGRI</p>
                <p><strong>Blockchain:</strong> Connected to Sepolia ✅</p>
            </div>
        </div>
        
        <p><em>Note: This demonstrates the purchased contracts tracking interface for the POC.</em></p>
    `;
}

// Update AgriCoin balance display
async function updateAgriCoinBalance() {
    const balanceElement = document.getElementById('retailer-agricoin-balance');
    if (!balanceElement || !currentAccount || !contracts.AgriCoin) {
        return;
    }
    
    try {
        const agriBalance = await contracts.AgriCoin.methods.balanceOf(currentAccount).call();
        const balanceInAGRI = parseFloat(web3.utils.fromWei(agriBalance, 'ether')).toFixed(2);
        balanceElement.textContent = balanceInAGRI;
    } catch (error) {
        console.error('Error getting AgriCoin balance:', error);
        balanceElement.textContent = 'Error loading balance';
    }
}

// Refresh current page content
function refreshCurrentPageContent() {
    setTimeout(() => {
        if (currentAccount && document.getElementById('retailer-page').classList.contains('active')) {
            loadAvailableContracts();
            loadRetailerContracts();
            updateAgriCoinBalance();
        } else if (currentAccount && document.getElementById('farmer-page').classList.contains('active')) {
            loadFarmerContracts();
        }
    }, 500);
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('AgriMarket app initialized');
    showPage('home');
    
    // Add wallet button listeners
    document.getElementById('connect-wallet').addEventListener('click', connectWallet);
    document.getElementById('disconnect-wallet').addEventListener('click', disconnectWallet);
    
    // Add form listeners
    const createCont