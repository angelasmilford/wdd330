import {
  getLocalStorage,
  setLocalStorage,
  getParams,
  setCartItems,
} from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { productDetails } from "./productDetails.mjs";

const productId = getParams("product");
setCartItems(getLocalStorage("so-cart").length);
productDetails(productId);
// console.log(await findProductById(productId));
