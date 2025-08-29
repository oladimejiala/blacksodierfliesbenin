// cart.js
let cartItems = [];
let userData = {};

function showCartModal(product) {
    // Add product to cart
    cartItems.push(product);
    
    // Show modal
    const modalHTML = `
    <div class="modal fade" id="quoteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Complete Your Quote Request</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="quoteForm">
                        <div class="mb-3">
                            <label for="fullName" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="fullName" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone (WhatsApp preferred)</label>
                            <input type="tel" class="form-control" id="phone" required>
                        </div>
                        <div class="mb-3">
                            <label for="wechat" class="form-label">WeChat ID (optional)</label>
                            <input type="text" class="form-control" id="wechat">
                        </div>
                        <div class="mb-3">
                            <label for="address" class="form-label">Full Address</label>
                            <textarea class="form-control" id="address" rows="3" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="country" class="form-label">Country</label>
                            <input type="text" class="form-control" id="country" required>
                        </div>
                        <div class="mb-3">
                            <label for="state" class="form-label">State/Province</label>
                            <input type="text" class="form-control" id="state" required>
                        </div>
                        <div class="mb-3">
                            <label for="city" class="form-label">City</label>
                            <input type="text" class="form-control" id="city" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Continue to Quote</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('quoteModal'));
    modal.show();
    
    document.getElementById('quoteForm').addEventListener('submit', function(e) {
        e.preventDefault();
        userData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            wechat: document.getElementById('wechat').value,
            address: document.getElementById('address').value,
            country: document.getElementById('country').value,
            state: document.getElementById('state').value,
            city: document.getElementById('city').value,
            timestamp: new Date().toISOString()
        };
        modal.hide();
        window.location.href = '/quote.html';
    });
}

// On product pages
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: this.dataset.price,
            image: this.dataset.image,
            quantity: 1 // Default quantity
        };
        showCartModal(product);
    });
});