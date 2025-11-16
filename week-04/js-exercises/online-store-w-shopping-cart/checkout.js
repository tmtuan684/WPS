function renderOrderSummary() {

  const container = document.getElementById('order-summary-items');
  const cartCountBadge = document.getElementById('cart-count');
  renderCart(container, cartCountBadge);
}

/* --- Init --- */

document.addEventListener('DOMContentLoaded', async function () {
  renderOrderSummary();
});
