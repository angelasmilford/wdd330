import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, } from "./utils.mjs";

export function productDetails(productId) {
    renderProductDetails(productId)
}

async function renderProductDetails(productId) {
    const tentJson = await findProductById(productId)
    // const name = document.getElementById("productName");
    // name.textContent = tentJson.Name;
    document
        .getElementById("productName")
        .textContent = tentJson.Name;
    document
        .getElementById("productNameWithoutBrand")
        .textContent = tentJson.NameWithoutBrand;
    document
        .getElementById("productImage")
        .src = tentJson.Image;
    document
        .getElementById("productFinalPrice")
        .textContent = `$${tentJson.FinalPrice}`;
    document
        .getElementById("productColorName")
        .textContent = tentJson.Colors[0].ColorName;
    document
        .getElementById("productDescriptionHtmlSimple")
        .innerHTML = tentJson.DescriptionHtmlSimple;
    document
        .getElementById("addToCart")
        .setAttribute("data-id", productId)
    document
        .getElementById("addToCart")
        .addEventListener("click", () => addProductToCart(tentJson));

}

function addProductToCart(productId) {
    let cart = getLocalStorage("so-cart"); //ensures that cart is set to the saved cart data from localStorage, or an empty array if none exists, so it can safely use array methods like .push().
    if (cart === null) {
      cart = [];
    }
    try {
      const existing = JSON.parse(localStorage.getItem("so-cart")); //tries to load and parse a cart from localStorage, ensuring it's stored as an array, and logs an error if parsing fails.
      // If existing is an array, use it; if it's not, wrap it in an array
      if (Array.isArray(existing)) { 
        cart = existing; //existing is an array, it assigns it directly to cart.
      //existing is a single value (not an array), it is wrapped in an array to maintain consistent structure in cart
      } else if (existing) { 
        cart = [existing];
      }
    } catch (e) {
      console.error("Failed to parse localStorage cart:", e); //logs an error message to the console along with the actual error, so developers can debug the issue.
    }
  
    cart.push(productId); //adds the new product to the end of the cart array, allowing multiple products to accumulate over time.
    setLocalStorage("so-cart", cart); //saves the updated cart array back to localStorage as a JSON string under the key "so-cart".
  }

  