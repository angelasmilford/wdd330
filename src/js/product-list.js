import productList, { searchedProductList, sortedProductList } from "./productList.mjs";
import { loadHeaderFooter, getParams, updateCartItems } from "./utils.mjs";
const productListHTML = document.querySelector(".product-list");
const topProducts = document.querySelector("span");
const category = getParams("category");
const search = getParams("search")
const USE_CATEGORY = category != null;
const USE_SEARCH = !USE_CATEGORY && search != null;

if (USE_CATEGORY) {
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    topProducts.textContent = capitalizedCategory;
    loadHeaderFooter();
    updateCartItems();
    productList(productListHTML, category)
}

if (USE_SEARCH) {
    const capitalizedSearch = search.charAt(0).toUpperCase() + search.slice(1);
    topProducts.textContent = capitalizedSearch;
    loadHeaderFooter();
    updateCartItems();
    searchedProductList(productListHTML, search);
}

const sortButtons = document.querySelectorAll(".sort-button");

function toggleButton(selectedButton) {
    for (let i = 0; i < sortButtons.length; i++) {
        let button = sortButtons[i];
        
        if (button !== selectedButton) {
            button.classList.remove("sort-button-selected");
        } else {
            button.classList.add("sort-button-selected");
        }
    }
    
    sortedProductList(productListHTML, USE_SEARCH && search || category, selectedButton.getAttribute("sort-method"), USE_SEARCH);
}

for (let i = 0; i < sortButtons.length; i++) {
    let button = sortButtons[i];
    
    button.addEventListener("click", () => {
        toggleButton(button);
    })
}