import productList, { sortedProductList } from "./productList.mjs";
import { loadHeaderFooter, getParams, updateCartItems } from "./utils.mjs";
const productListHTML = document.querySelector(".product-list");
const category = getParams("category");
const topProducts = document.querySelector("span");
const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
topProducts.textContent = capitalizedCategory;
loadHeaderFooter();
updateCartItems();
productList(productListHTML, category);

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
    
    sortedProductList(productListHTML, category, selectedButton.getAttribute("sort-method"));
}

for (let i = 0; i < sortButtons.length; i++) {
    let button = sortButtons[i];
    
    button.addEventListener("click", () => {
        toggleButton(button);
    })
}