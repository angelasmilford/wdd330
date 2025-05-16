import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let productListElement = document.querySelector(".product-list");
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productListElement.innerHTML = htmlItems.join("");

  // Get a list of all the products
  const products = productListElement.querySelectorAll(".cart-card");

  products.forEach((product, index) => {
    let button = product.querySelector(".cart-card__remove");

    button.addEventListener("click", () => {
      // Remove item from local storage at same index
      const localStorage = getLocalStorage("so-cart");
      localStorage.splice(index, 1);
      setLocalStorage("so-cart", localStorage);

      // Refresh HTML
      productListElement.innerHTML = "";
      renderCartContents();
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button data-id="${item.Id}" type="button" class="cart-card__remove">X</button> 
</li>`;

  return newItem;
}

renderCartContents();
