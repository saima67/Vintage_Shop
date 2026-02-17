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
    <div class="border-1 border-gray-200 rounded-lg">
          <div class="flex justify-center">
            <img class="w-9/12 rounded-t-lg" src=${product.image} alt="" />
          </div>
          <div class="p-4">
            <div class="flex justify-between">
              <p class="text-blue-800 bg-blue-300 p-1 rounded-lg">${product.category}</p>
              <p class="text-gray-500">
                <i class="fa-solid fa-star text-yellow-400"></i>${product.rating.rate}(${product.rating.count})
              </p>
            </div>
            <div class="py-4">
              <p class="text-wrap font-bold">${product.title}</p>
              <p class="font-bold">$${product.price}</p>
            </div>
            <div class="flex justify-between">
              <button class="rounded-sm border-gray-600 border-1 bg-white px-6 cursor-pointer">
                <i class="fa-regular fa-eye"></i>
                Details
              </button>
              <button
                class="rounded-sm border-gray-600 border-1 bg-blue-500 px-6 text-white cursor-pointer"
              >
                <i
                  class="fa-solid fa-cart-arrow-down mr-10 sm:mr-5 text-white"
                ></i
                >Add
              </button>
            </div>
          </div>
        </div>
    `;
    productsContainer.append(productDiv);
  });
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
    <div class="border-1 border-gray-200 rounded-lg">
          <div class="flex justify-center">
            <img class="w-9/12 rounded-t-lg" src=${product.image} alt="" />
          </div>
          <div class="p-4">
            <div class="flex justify-between">
              <p class="text-blue-800 bg-blue-300 p-1 rounded-lg">${product.category}</p>
              <p class="text-gray-500">
                <i class="fa-solid fa-star text-yellow-400"></i>${product.rating.rate}(${product.rating.count})
              </p>
            </div>
            <div class="py-4">
              <p class="text-wrap font-bold">${product.title}</p>
              <p class="font-bold">$${product.price}</p>
            </div>
            <div class="flex justify-between">
              <button class="rounded-sm border-gray-600 border-1 bg-white px-6">
                <i class="fa-regular fa-eye"></i>
                Details
              </button>
              <button
                class="rounded-sm border-gray-600 border-1 bg-blue-500 px-6 text-white"
              >
                <i
                  class="fa-solid fa-cart-arrow-down mr-10 sm:mr-5 text-white"
                ></i
                >Add
              </button>
            </div>
          </div>
        </div>
    `;
    productContainer.append(productDiv);
  });
};
loadCategories();
loadProducts();
