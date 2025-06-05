import {
  getLocalStorage,
  setLocalStorage,
  getParams, 
  loadHeaderFooter,
  updateCartItems,
} from "./utils.mjs";

import { findProductById } from "./externalServices.mjs";
import { productDetails } from "./productDetails.mjs";

const productId = getParams("product");
productDetails(productId);
// console.log(await findProductById(productId));
loadHeaderFooter();
updateCartItems();