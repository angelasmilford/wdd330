import { getLocalStorage, setLocalStorage, getParams } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { productDetails } from "./productDetails.mjs";

const productId = getParams('product');
console.log(productId);
productDetails(productId);
// console.log(await findProductById(productId));

