import { getLocalStorage, setCartItems } from "./utils.mjs";
setCartItems(getLocalStorage("so-cart").length);
