import { getLocalStorage, loadHeaderFooter, setLocalStorage, updateCartItems } from "./utils.mjs";

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

  // Connect quantity adjustment buttons
  for (let item in cartItems) {
    const itemCard = productListElement.querySelector(`.item-${cartItems[item].Id}`)
    const addButton = itemCard.querySelector(".cart-cart__quantity-add");
    const subButton = itemCard.querySelector(".cart-cart__quantity-subtract");

    addButton.addEventListener("click", () => {
      cartItems[item].multiple += 1;
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });

    subButton.addEventListener("click", () => {
      cartItems[item].multiple = Math.max(cartItems[item].multiple - 1, 1);
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });
  }

  if (Array.isArray(cartItems) && cartItems.length > 0) {
    // If the cart is not empty, remove the HTML class that hides the total cost element.
    document.querySelector(".cart-footer").classList.remove("hide");
    document.querySelector(".cart-footer-empty").classList.add("hide");

    // Reduce the card array to gather the total cost of all items.
    const total = cartItems.reduce((final, item) => final += item.FinalPrice * item.multiple, 0);

    // Convert the total price in the cart to a formatted USD string.
    const formattedTotal = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);

    // Set the text content of the cart total to the formatted price.
    document.querySelector(".cart-total").textContent =
      `Total: ${formattedTotal}`;
  } else {
    document.querySelector(".cart-footer").classList.add("hide");
    document.querySelector(".cart-footer-empty").classList.remove("hide");
  }

  updateCartItems();
}

function cartItemTemplate(item) {
  const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.FinalPrice * item.multiple)
  const newItem = `<li class="cart-card divider item-${item.Id}">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images && item.Images.PrimaryMedium || item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button class="cart-cart__quantity-subtract quantity-button">-</button>
      <p class="cart-cart__quantity-value">qty: ${item.multiple}</p>
      <button class="cart-cart__quantity-add quantity-button">+</button>
    </div>
    <p class="cart-card__price">${formattedPrice}</p>
    <button data-id="${item.Id}" type="button" class="cart-card__remove">Remove</button> 
  </li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
updateCartItems();