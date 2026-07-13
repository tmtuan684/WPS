/*-------------------------------------------------------   
                PRODUCT RATING & REVIEW
-------------------------------------------------------*/
// ===== Rating & Review Data (LocalStorage) =====
function getReviews() {
  return JSON.parse(localStorage.getItem('reviews')) || [];
}

function saveReviews(reviews) {
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function getProductReviews(productId) {
  return getReviews().filter(r => r.productId === productId);
}

function getAverageRating(productId) {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return { avg: 0, count: 0 };
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return { avg: sum / reviews.length, count: reviews.length };
}

function renderRatingStars(avgRating) {
  const rounded = Math.round(avgRating); // 0–5
  let html = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) {
      html += `<i class="bi bi-star-fill"></i>`;
    } else {
      html += `<i class="bi bi-star"></i>`;
    }
  }

  return `<span class="text-warning">${html}</span>`;
}
