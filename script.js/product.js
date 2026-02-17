// const { createElement } = require("react");

const loadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  //categoryContainer.innerHTML = "";
  for (let category of categories) {
    //console.log(category);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `<button id="${category}" onclick="loadByCategory(\`${category}\`)" class="category px-3 py-1 border-1 border-gray-300 cursor-pointer capitalize rounded-2xl hover:bg-blue-950 hover:text-white ">
          ${category}
        </button>
        `;
    categoryContainer.append(btnDiv);
  }
};

const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const btn = document.getElementById("all");
      btn.classList.add("active");
      displayProducts(json);
    });
};

const displayProducts = (products) => {
  //   console.log(products);
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
    <div class="product-card">
          <div class="product-image-box">
            <img src="${product.image}" alt="">
          </div>

          <div class="product-content">
            <div class="product-category">${product.category}</div>

            <div class="product-title">${product.title}</div>

            <div class="product-rating">
              ⭐ ${product.rating.rate} (${product.rating.count})
            </div>

            <div class="product-price">$${product.price}</div>

            <div class="card-buttons">
              <button onclick="loadProductDetail(${product.id})" class="common-button details-btn">Details</button>
              <button class="common-button add-btn">Add</button>
            </div>
          </div>
        </div>
    `;
    productsContainer.append(productDiv);
  });
};

const loadProductDetail = async (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayProductDetails(details);
};

const displayProductDetails = (product) => {
  console.log(product);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<div>
              <h2 class="text-lg font-bold">${product.title}</h2>
              <p class="py-3">${product.description}</p>
              <p class="text-lg mb-4"><span class="font-bold">$${product.price}</span> <i class="fa-solid fa-star text-yellow-400"></i>${product.rating.rate}(${product.rating.count})</p>
              <button class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer">Buy Now</button>
              <button class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer">ADD</button>
            </div>`;
  document.getElementById("details-modal").showModal();
};

const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".category");
  categoryButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadByCategory = (category) => {
  //console.log(category);
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const btn = document.getElementById(category);
      btn.classList.add("active");
      displayByCategory(json);
    });
};

const displayByCategory = (products) => {
  //console.log(products);
  const productContainer = document.getElementById("products-container");
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
    <div class="product-card">
          <div class="product-image-box">
            <img src="${product.image}" alt="">
          </div>

          <div class="product-content">
            <div class="product-category">${product.category}</div>

            <div class="product-title">${product.title}</div>

            <div class="product-rating">
              ⭐ ${product.rating.rate} (${product.rating.count})
            </div>

            <div class="product-price">$${product.price}</div>

            <div class="card-buttons">
              <button onclick="loadProductDetail(${product.id})" class="common-button details-btn">Details</button>
              <button class="common-button add-btn">Add</button>
            </div>
          </div>
        </div>
    `;
    productContainer.append(productDiv);
  });
};
loadCategories();
loadProducts();
