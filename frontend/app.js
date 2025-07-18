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
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('AgriMarket app initialized');
    showPage('home');
});

// Web3 and MetaMask functionality
let web3;
let currentAccount;

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
            updateWalletUI();
            
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
        // Get balance
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

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('AgriMarket app initialized');
    showPage('home');
    
    // Add wallet button listeners
    document.getElementById('connect-wallet').addEventListener('click', connectWallet);
    document.getElementById('disconnect-wallet').addEventListener('click', disconnectWallet);
    
    // Listen for account changes
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', function (accounts) {
            if (accounts.length === 0) {
                disconnectWallet();
            } else {
                currentAccount = accounts[0];
                updateWalletUI();
            }
        });
    }
});

// Farmer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add form listeners after existing code
    const createContractForm = document.getElementById('create-contract-form');
    const milestoneForm = document.getElementById('milestone-form');
    
    if (createContractForm) {
        createContractForm.addEventListener('submit', handleCreateContract);
    }
    
    if (milestoneForm) {
        milestoneForm.addEventListener('submit', handleMilestoneSubmit);
    }
});

// Handle create contract form submission
async function handleCreateContract(event) {
    event.preventDefault();
    
    if (!currentAccount) {
        alert('Please connect MetaMask first');
        return;
    }
    
    const cropType = document.getElementById('crop-type').value;
    const quantity = document.getElementById('quantity').value;
    const pricePerKg = document.getElementById('price-per-kg').value;
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Contract...';
    submitBtn.disabled = true;
    
    try {
        // Here we'll add blockchain interaction later
        console.log('Creating contract:', { cropType, quantity, pricePerKg });
        
        // Simulate contract creation for now
        setTimeout(() => {
            alert(`Contract created successfully!\nCrop: ${cropType}\nQuantity: ${quantity}kg\nPrice: ${pricePerKg} AgriCoin/kg`);
            
            // Reset form
            event.target.reset();
            
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Refresh contracts list
            loadFarmerContracts();
        }, 2000);
        
    } catch (error) {
        console.error('Error creating contract:', error);
        alert('Failed to create contract');
        
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
    
    // Simulate loading contracts
    contractsList.innerHTML = `
        <div class="contract-item">
            <h4>Tomato Contract #001</h4>
            <p><strong>Quantity:</strong> 100 kg</p>
            <p><strong>Price:</strong> 5 AgriCoin/kg</p>
            <p><strong>Status:</strong> <span class="contract-status status-active">Active</span></p>
            <p><strong>Milestones:</strong> 2/3 completed</p>
        </div>
        <div class="contract-item">
            <h4>Cucumber Contract #002</h4>
            <p><strong>Quantity:</strong> 50 kg</p>
            <p><strong>Price:</strong> 3 AgriCoin/kg</p>
            <p><strong>Status:</strong> <span class="contract-status status-pending">Pending Buyer</span></p>
            <p><strong>Milestones:</strong> 0/3 completed</p>
        </div>
    `;
}

// Update the existing showPage function to load contracts when farmer page is shown
const originalShowPage = showPage;
showPage = function(pageName) {
    originalShowPage(pageName);
    
    if (pageName === 'farmer') {
        loadFarmerContracts();
    }
};

// Add retailer form listener to existing DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Add retailer form listeners
    const approveMilestoneForm = document.getElementById('approve-milestone-form');
    const buyAgricoinBtn = document.getElementById('buy-agricoin-btn');
    
    if (approveMilestoneForm) {
        approveMilestoneForm.addEventListener('submit', handleMilestoneApproval);
        console.log('Approve milestone form listener added');
    }
    
    if (buyAgricoinBtn) {
        buyAgricoinBtn.addEventListener('click', handleBuyAgriCoin);
        console.log('Buy AgriCoin button listener added');
    }
});

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
    
    const amount = prompt('How many AgriCoin do you want to buy?');
    if (amount && !isNaN(amount) && amount > 0) {
        console.log('Buying AgriCoin:', amount);
        alert(`Purchase request sent for ${amount} AgriCoin`);
        updateAgriCoinBalance();
    }
}

// Load available contracts for retailers
function loadAvailableContracts() {
    const contractsList = document.getElementById('available-contracts-list');
    if (!contractsList) return;
    
    contractsList.innerHTML = `
        <div class="contract-card">
            <div class="contract-header">
                <div class="contract-title">🍅 Tomato Contract #003</div>
                <div class="contract-price">8 AGRI/kg</div>
            </div>
            <div class="contract-details">
                <div class="contract-detail"><strong>Quantity:</strong> 200 kg</div>
                <div class="contract-detail"><strong>Farmer:</strong> 0x1234...5678</div>
                <div class="contract-detail"><strong>Total Cost:</strong> 1,600 AGRI</div>
                <div class="contract-detail"><strong>Harvest Date:</strong> Sept 2025</div>
            </div>
            <button class="purchase-btn" onclick="purchaseContract('003')">Purchase Contract</button>
        </div>
        
        <div class="contract-card">
            <div class="contract-header">
                <div class="contract-title">🥒 Cucumber Contract #004</div>
                <div class="contract-price">4 AGRI/kg</div>
            </div>
            <div class="contract-details">
                <div class="contract-detail"><strong>Quantity:</strong> 150 kg</div>
                <div class="contract-detail"><strong>Farmer:</strong> 0x9876...4321</div>
                <div class="contract-detail"><strong>Total Cost:</strong> 600 AGRI</div>
                <div class="contract-detail"><strong>Harvest Date:</strong> Aug 2025</div>
            </div>
            <button class="purchase-btn" onclick="purchaseContract('004')">Purchase Contract</button>
        </div>
    `;
}

// Load retailer's purchased contracts
function loadRetailerContracts() {
    const contractsList = document.getElementById('retailer-contracts-list');
    if (!contractsList) return;
    
    contractsList.innerHTML = `
        <div class="contract-item">
            <h4>🍅 Tomato Contract #001</h4>
            <p><strong>Quantity:</strong> 100 kg | <strong>Price:</strong> 5 AGRI/kg</p>
            <div class="milestone-progress">
                <p><strong>Progress:</strong> 2/3 milestones completed</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 66%;"></div>
                </div>
            </div>
        </div>
    `;
}

// Update AgriCoin balance display
function updateAgriCoinBalance() {
    const balanceElement = document.getElementById('retailer-agricoin-balance');
    if (balanceElement) {
        balanceElement.textContent = '1,250.50'; // Simulated balance
    }
}

// Purchase contract function
function purchaseContract(contractId) {
    if (!currentAccount) {
        alert('Please connect MetaMask first');
        return;
    }
    
    if (confirm(`Do you want to purchase contract #${contractId}?`)) {
        alert(`Contract #${contractId} purchased successfully!`);
        loadAvailableContracts();
        loadRetailerContracts();
    }
}

// Update showPage function for retailer
const originalShowPage2 = showPage;
showPage = function(pageName) {
    originalShowPage2(pageName);
    
    if (pageName === 'farmer') {
        loadFarmerContracts();
    } else if (pageName === 'retailer') {
        loadAvailableContracts();
        loadRetailerContracts();
        updateAgriCoinBalance();
    }
};