import { getLocalStorage, renderWithTemplate, loadHeaderFooter } from "./utils.mjs"

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Ideally will be merged with along with the empty cart logic later down the line.
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    // If the cart is not empty, remove the HTML class that hides the total cost element.
    document.querySelector(".cart-footer").classList.remove("hide");

    // Reduce the card array to gather the total cost of all items.
    const total = cartItems.reduce((final, item) => final += item.FinalPrice, 0);

    // Convert the total price in the cart to a formatted USD string. 
    const formattedTotal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)

    // Set the text content of the cart total to the formatted price.
    document.querySelector(".cart-total").textContent = `Total: ${formattedTotal}`;
  }
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
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
