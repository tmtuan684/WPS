/* --- Helpers: fetch products & cart --- */

async function fetchJSONData(filepath) {
  try {
    const response = await fetch(filepath);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch JSON data:', error);
  }
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count;
}

/* --- Render order summary --- */

let products = [];

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderOrderSummary() {
  const cart = getCart();
  const container = document.getElementById('order-summary-items');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');

  if (cart.length === 0) {
    container.innerHTML = `
      <p class="text-muted">Your cart is empty. Please add items before checking out.</p>
    `;
    subtotalEl.textContent = '0.00';
    totalEl.textContent = '0.00';
    return;
  }

  let itemsHtml = '';
  let subtotal = 0;

  cart.forEach(item => {
    const product = products.find(p => p.name === item.name);
    if (!product) return;

    const itemTotal = product.price * item.qty;
    subtotal += itemTotal;

    itemsHtml += `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
          <div class="small fw-semibold">${product.name}</div>
          <div class="small text-muted">Qty: ${item.qty}</div>
        </div>
        <div class="small fw-semibold">
          $${formatCurrency(itemTotal)}
        </div>
      </div>
    `;
  });

  container.innerHTML = itemsHtml;
  subtotalEl.textContent = formatCurrency(subtotal);
  totalEl.textContent = formatCurrency(subtotal); // shipping free
}

/* --- Handle payment method toggle --- */

function setupPaymentToggle() {
  const payCOD = document.getElementById('payCOD');
  const payCard = document.getElementById('payCard');
  const cardInfo = document.getElementById('card-info');

  function updateVisibility() {
    if (payCard.checked) {
      cardInfo.classList.remove('d-none');
    } else {
      cardInfo.classList.add('d-none');
    }
  }

  payCOD.addEventListener('change', updateVisibility);
  payCard.addEventListener('change', updateVisibility);
  updateVisibility();
}

/* --- Handle form submission --- */

function setupCheckoutForm() {
  const form = document.getElementById('checkout-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    // Simple client-side validation
    let isValid = true;

    function checkRequired(id) {
      const input = document.getElementById(id);
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    }

    checkRequired('fullName');
    checkRequired('email');
    checkRequired('phone');
    checkRequired('address');
    checkRequired('city');
    checkRequired('zip');

    if (!isValid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // In a real app, send data to server here
    alert('Thank you! Your order has been placed successfully. (Demo)');

    // Clear cart and update UI
    saveCart([]);
    updateCartBadge();
    renderOrderSummary();
    form.reset();
  });
}

/* --- Init --- */

document.addEventListener('DOMContentLoaded', async function () {
  products = await fetchJSONData('data/products.json');
  renderOrderSummary();
  updateCartBadge();
  setupPaymentToggle();
  setupCheckoutForm();
});
