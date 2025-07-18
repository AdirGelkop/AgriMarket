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