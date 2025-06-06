import productList from "./productList.mjs";
import { loadHeaderFooter, getLocalStorage, updateCartItems } from "./utils.mjs";
const productListHTML = document.querySelector(".product-list");
loadHeaderFooter();
updateCartItems();
productList(productListHTML, "tents");
