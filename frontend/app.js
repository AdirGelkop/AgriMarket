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