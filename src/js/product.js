import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  // Parse the local storage cart into JSON
  let cartStorage = JSON.parse(localStorage.getItem("so-cart"));
  // If cart storage exists, push the new product to the array and set local storage again.
  
  if (cartStorage) {
    cartStorage.push(product);
    setLocalStorage("so-cart", cartStorage);
  }
  else {
    // If cart storage doesn't exist, set the local storage to the product in an array.
    setLocalStorage("so-cart", [ product ]);
  }
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
