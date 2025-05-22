import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
const productListHTML = document.querySelector(".product-list");
loadHeaderFooter();
productList(productListHTML, "tents")