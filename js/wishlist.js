// wishlist.js
let wishlist = [];

function toggleWishlist(productId) {
    if (isInWishlist(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        document.querySelector(`.wishlist-btn[data-id="${productId}"]`).classList.remove('active');
    } else {
        wishlist.push(productId);
        document.querySelector(`.wishlist-btn[data-id="${productId}"]`).classList.add('active');
        
        // If user is logged in, sync with server
        if (userLoggedIn) {
            saveWishlistToServer();
        }
    }
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function saveWishlistToServer() {
    fetch('/api/update-wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ wishlist })
    })
    .catch(error => console.error('Error updating wishlist:', error));
}

// Initialize wishlist buttons
document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.id;
        toggleWishlist(productId);
    });
    
    // Check if item is in wishlist on page load
    if (isInWishlist(this.dataset.id)) {
        this.classList.add('active');
    }
});