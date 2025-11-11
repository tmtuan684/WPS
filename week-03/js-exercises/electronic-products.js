/* Fetch JSON for product items */
async function fetchJSONData(filepath) {
    try {
        const response = await fetch(filepath); // Path to your JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        return data;
    } catch (error) {
        console.error('Failed to fetch JSON data:', error);
    }
    

}
/* Make a product card */
function productCard(p) {
  return `
    <div class="col">
      <div class="card h-100 shadow-sm product-card">
        <div class="ratio ratio-4x3">
          <img src="${p.photo}" class="card-img-top object-fit-cover" alt="${p.name}">
        </div>
        <div class="card-body d-flex flex-column">
          <h3 class="h6 card-title">${p.name}</h3>
          <p class="small text-muted mb-2">${p.category || 'Quality electronic product.'}</p>
          <div class="mt-auto">
            <span class="fw-semibold text-primary">$ ${p.price}</span>
            <button class="btn btn-sm btn-outline-primary w-100 mt-2">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>`;
}
/* Remove all child nodes of an element */
function removeAllChildNodes(element) {
    // Keep removing first child until all element's children nodes is removed
    while (element.firstChild) {
            element.removeChild(element.firstChild);
    }
}
/* Filter products by category */
async function filterProducts(category="") {
    
    let opt = filterOpt.options[filterOpt.selectedIndex]?.text;
    let val = filterVal.value;
    
    removeAllChildNodes(productList);
    products = await fetchJSONData('./electronics-products-100.json');
    if (opt !== "All") {
        products = products.filter(p => p[opt].toLowerCase() === val.toLowerCase())
    }
    renderProductsGrid(products, productList);
}

/* Pagination */
const PAGE_SIZE = 10;
currentPage = 0;

/** Compute number of pages to hold all products */
function totalPages(products) {
  return Math.max(1, Math.ceil(products.length / PAGE_SIZE));
}
/** Determine which products are listed on which page */
function getPageItems(products, currentPage, size) {
  const start = (currentPage - 1) * size;
  return products.slice(start, start + size);
}
/** Render pagination */
function renderPagination(products, currentPage, paginationNav) {
    const pages = totalPages(products);
    let pageNav = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
    for(let i = 1; i <= pages; i++) {
        pageNav += `<li class="page-item ${i === currentPage ? "active": ""}"><a class="page-link" data-page="${i}" href="#">${i}</a></li>`
    }
    pageNav += `<li class="page-item"><a class="page-link" href="#">Next</a></li>`
    paginationNav.innerHTML = pageNav;
}
/** Render Grid to contain products on one page*/
function renderProductsGrid(products, container) {
    removeAllChildNodes(container);
    products.forEach(p => { // Step 2. For each product, make a product card

        const productDiv = document.createElement('div');
        productDiv.innerHTML = productCard(p);
        container.appendChild(productDiv); // Step 3. Add product card to product list section on HTML page 
    });
}

/** Show products on current page */
function showItemsOnCurentPage(e) {
    // Check which page is selected

    const link = e.target.closest('a.page-link');
    
    e.preventDefault();
    const page = e.target.text;
    if (page === "Previous") {
        if (currentPage > 0) { 
        currentPage--;
        }
        else {
            currentPage = totalPages(products);
        }
    }
    else if (page === "Next") {
        if (currentPage < totalPages(products)) { 
            currentPage++;
        }
        else {
            currentPage = 1;
        }
    }
    else { 
        currentPage = parseInt(e.target.text);
    }
    renderPagination(products, currentPage, pagination);
    const list = getPageItems(products, currentPage, totalPages(products));
    renderProductsGrid(list, productList); 
}

document.addEventListener("DOMContentLoaded", async () => {
    productList = document.getElementById('product-list');
    pagination = document.querySelector('#pagination > ul');
    filterBtn = document.getElementById('filter-btn');
    filterOpt = document.getElementById('filter-option');
    filterVal = document.getElementById('filter-value')

    filterBtn.addEventListener('click', filterProducts);
    pagination.addEventListener('click', showItemsOnCurentPage);
    /* Read JSON file and render products */
    // Step 1. fetch data from file
    products = await fetchJSONData('./electronics-products-100.json');

    // Render products in pagination mode here 
    renderProductsGrid(products, productList);
    // Render pagination 
    renderPagination(products, 0, pagination);   
});
