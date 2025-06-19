import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, updateCartItems } from "./utils.mjs";
import { alertMessage } from "./utils.mjs";

export function productDetails(productId) {
    renderProductDetails(productId)
}

async function renderProductDetails(productId) {
    const tentJson = await findProductById(productId)
    // const name = document.getElementById("productName");
    // name.textContent = tentJson.Name;
    if (tentJson) {
      document
          .getElementById("productName")
          .textContent = tentJson.Name;
      document
          .getElementById("productNameWithoutBrand")
          .textContent = tentJson.NameWithoutBrand;
      document
          .getElementById("productImage")
          .src = tentJson.Images.PrimaryLarge;
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
    else {
      // Add the "hide" class to the first element with the "product-detail" class
      // to hide it and remove the same class from the first element with the
      // "product-error" class
      document.querySelector(".product-detail").classList.add("hide");
      document.querySelector(".product-error").classList.remove("hide");
    }
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

  let itemAlreadyExists = false;
  let existingItem = null;

  for (let index in cart) {
    if (cart[index].Id === productId.Id) {
      itemAlreadyExists = true;
      existingItem = cart[index];

      break;
    }
  }

  if (!itemAlreadyExists) {
    productId["multiple"] = 1;
    cart.push(productId)
  } else {
    existingItem.multiple += 1;

    console.log(existingItem.multiple)
  }

  setLocalStorage("so-cart", cart); //saves the updated cart array back to localStorage as a JSON string under the key "so-cart".
  updateCartItems();

  alertMessage("Product added to cart successfully!", "success");
}