/* ================================================================
                        Shopping Cart
================================================================= */
function cardItem(item, subtotal) {
    return `<tr class="align-middle">
                <td class="text-center">
                    <img src="${item.photo}" alt="${item.name}" 
                         style="width:70px;height:70px;object-fit:cover;border-radius:8px;">
                </td>

                <td>
                    <div class="fw-semibold">${item.name}</div>
                    <div class="text-muted small">$${item.price} each</div>
                </td>

                <td style="width:140px;">
                    <div class="input-group input-group-sm">
                        <span class="input-group-text">Qty</span>
                        <input type="number" 
                               min="1" 
                               value="${item.qty}" data-name="${item.name}" 
                               class="form-control cart-qty-input">
                    </div>
                </td>

                <td class="fw-bold">
                    $${subtotal.toFixed(2)}
                </td>

                <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger remove-item-btn" data-name="${item.name}">
                        Remove
                    </button>
                </td>
            </tr>
        `;
}
/**
 * Renders the shopping cart in the specified container element.
 * If the cart is empty, displays an empty state message.
 * Otherwise, generates a table with cart items showing image, product name, quantity controls, subtotal, and remove button.
 * Also displays the total price at the bottom.
 * 
 * @param {HTMLElement} containerDiv - The DOM element where the cart will be rendered
 * @returns {void}
 */
function renderCart(containerDiv, cartCountBadge) {
    const cart = getCart();   // [{ name, price, qty, photo }, ...]

    if (cart.length === 0) {
        containerDiv.innerHTML = `
            <div class="text-center py-5">
                <h3>Your cart is empty</h3>
                <p class="text-muted">Add items from the store to get started.</p>
            </div>`;
        return;
    }

    let rowsHTML = '';

    let totalItemNumber = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItemNumber += item.qty;
        const subtotal = item.price * item.qty;
        totalPrice += subtotal;
        rowsHTML += cardItem(item, subtotal);
    });

    // Render Cart Count Badge
    cartCountBadge.textContent = totalItemNumber;

    // Render Shopping Cart Details 
    containerDiv.innerHTML = `
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th style="width:100px;" class="text-center">Image</th>
                        <th>Product</th>
                        <th style="width:160px;">Quantity</th>
                        <th>Subtotal</th>
                        <th style="width:100px;"></th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
            </table>
        </div>

        <div class="text-end mt-3">
            <h4>Total: $${new Intl.NumberFormat().format(totalPrice)}</h4>
        </div>
    `;
}
/**
 * Run when cart.html is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    
    const cartCountBadge = document.getElementById("cart-count");
    const cartContainer = document.getElementById("cart-container");
    renderCart(cartContainer, cartCountBadge);

});


