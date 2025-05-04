import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart"); //ensures that cart is set to the saved cart data from localStorage, or an empty array if none exists, so it can safely use array methods like .push().
  
  if(!Array.isArray(cart)){
    console.warn("Cart was not an array, resetting cart.");
    cart = [];
  }
  
  cart.push(product); //adds the new product to the end of the cart array, allowing multiple products to accumulate over time.
  setLocalStorage("so-cart", cart); //saves the updated cart array back to localStorage as a JSON string under the key "so-cart".
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);