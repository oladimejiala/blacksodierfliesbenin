// add-to-cart-quote.js

let cartItems = [];
let userData = {};

function createCustomModal() {
    if (document.getElementById('quoteModal')) return;

    const modalHTML = `
    <div id="quoteModal" class="custom-modal-overlay">
        <div class="custom-modal">
            <div class="modal-header">
                <h2>Complete Your Quote Request</h2>
                <span class="close-btn" id="closeModal">&times;</span>
            </div>
            <div class="modal-body">
                <form id="quoteForm">
                    <label>Full Name<input type="text" id="fullName" required></label>
                    <label>Email<input type="email" id="email" required></label>
                    <label>Phone (WhatsApp preferred)<input type="tel" id="phone" required></label>
                    <label>WeChat ID (optional)<input type="text" id="wechat"></label>
                    <label>Full Address<textarea id="address" rows="3" required></textarea></label>
                    <label>Country<input type="text" id="country" required></label>
                    <label>State/Province<input type="text" id="state" required></label>
                    <label>City<input type="text" id="city" required></label>
                    <button type="submit">Continue to Quote</button>
                </form>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Close button logic
    document.getElementById('closeModal').addEventListener('click', hideModal);

    // Escape key closes modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') hideModal();
    });

    // Submit form
    document.getElementById('quoteForm').addEventListener('submit', function (e) {
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

        hideModal();
        setTimeout(() => {
            window.location.href = '/quote.html';
        }, 300);
    });
}

function showModal() {
    createCustomModal();
    document.getElementById('quoteModal').classList.add('show');
}

function hideModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) modal.classList.remove('show');
}

// Hook up product buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const product = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: this.dataset.price,
            image: this.dataset.image,
            quantity: 1
        };
        cartItems.push(product);
        showModal();
    });
});
