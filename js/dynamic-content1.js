function renderQuoteItems() {
const quoteItemsHTML = cartItems.map(item => `
<div class="quote-item" data-id="${item.id}">
    <img src="${item.image}" alt="${item.name}" class="product-thumb">
    <h3>${item.name}</h3>
    <div class="quantity-control">
        <button class="decrease-qty">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase-qty">+</button>
    </div>
    <div class="price">${(item.price * item.quantity).toLocaleString()} CFA</div>
    <button class="remove-item">Remove</button>
</div>
`).join('');

document.getElementById('quoteItems').innerHTML = quoteItemsHTML;
}