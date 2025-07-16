// ======================
// CART MANAGEMENT SYSTEM
// ======================

// A. Configuration
const CART_API_ENDPOINT = '/api/cart';
const SYNC_INTERVAL = 50000; // Sync with backend every 5 seconds

// B. State Management
let cartItems = [];
let userToken = null; // Would come from your auth system

// C. Initialize Cart
async function initCart() {
    // 1. First load from session storage (instant)
    loadFromSessionStorage();
    
    // 2. Then sync with backend (fresh data)
    try {
        await syncWithBackend();
    } catch (error) {
        console.warn("Backend sync failed, using local data", error);
    }
    
    renderQuoteItems();
    startSyncInterval();
}

// D. Data Fetching Methods
function loadFromSessionStorage() {
    const savedCart = JSON.parse(sessionStorage.getItem('amtech_cart')) || [];
    cartItems = savedCart;
}

async function syncWithBackend() {
    const response = await fetch(CART_API_ENDPOINT, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    });
    
    if (!response.ok) throw new Error("Sync failed");
    
    const { items } = await response.json();
    cartItems = mergeCarts(cartItems, items);
    sessionStorage.setItem('amtech_cart', JSON.stringify(cartItems));
}

// E. Smart Cart Merging (client + server)
function mergeCarts(localCart, serverCart) {
    // Merge strategy: Prefer server data, but keep local changes
    const merged = [...serverCart];
    
    localCart.forEach(localItem => {
        const existing = merged.find(i => i.id === localItem.id);
        if (!existing) {
            merged.push(localItem); // Add new items
        } else if (localItem.updatedAt > existing.updatedAt) {
            Object.assign(existing, localItem); // Override if local is newer
        }
    });
    
    return merged;
}

// F. Background Sync
function startSyncInterval() {
    setInterval(async () => {
        if (navigator.onLine) {
            await syncWithBackend();
        }
    }, SYNC_INTERVAL);
}

// ======================
// QUOTE PAGE FUNCTIONALITY
// ======================

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load cart
    await initCart();
    
    // 2. Render if items exist
    if (!cartItems.length) {
        showEmptyState();
        return;
    }
    
    renderQuoteItems();
    setupEventListeners();
});

function renderQuoteItems() {
    const quoteItemsHTML = cartItems.map(item => `
        <div class="quote-item" data-id="${item.id}" data-updated="${item.updatedAt || Date.now()}">
            <img src="${getProductImage(item)}" alt="${item.name}" class="product-thumb">
            <div class="product-info">
                <h3>${item.name}</h3>
                ${item.specs ? `<div class="specs">${formatSpecs(item.specs)}</div>` : ''}
            </div>
            <div class="quantity-control">
                <button class="btn-qty decrease-qty">−</button>
                <span class="quantity">${item.quantity}</span>
                <button class="btn-qty increase-qty">+</button>
            </div>
            <div class="price">${formatPrice(item.price * item.quantity)}</div>
            <button class="btn-remove">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');
    
    document.getElementById('quoteItems').innerHTML = quoteItemsHTML || showEmptyState();
}

// ======================
// HELPER FUNCTIONS
// ======================

function formatPrice(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF'
    }).format(amount).replace('CFA', 'FCFA');
}

function getProductImage(item) {
    return item.image || `img/products/${item.id}.jpg`;
}

function formatSpecs(specs) {
    return Object.entries(specs)
        .map(([key, value]) => `<span class="spec-badge">${key}: ${value}</span>`)
        .join('');
}

function showEmptyState() {
    document.getElementById('quoteItems').innerHTML = `
        <div class="empty-cart">
            <i class="fas fa-shopping-basket fa-3x"></i>
            <h3>Your quote request is empty</h3>
            <p>Add products to get started</p>
            <a href="/products.html" class="btn btn-primary">
                Browse Products
            </a>
        </div>
    `;
}