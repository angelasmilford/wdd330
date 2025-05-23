import { getLocalStorage, setLocalStorage, getParams, loadHeaderFooter } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { productDetails } from "./productDetails.mjs";

const productId = getParams('product');
productDetails(productId);
// console.log(await findProductById(productId));

loadHeaderFooter();