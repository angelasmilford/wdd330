
import { getProductsByCategory } from "./externalServices.mjs"
import { formatCurrency, renderListWithTemplate } from "./utils.mjs";

// function renderList(selector, productList) {
//     let htmlStrings = productList.map((item) => productCardTemplate(item));
//     selector.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
// }

function filterList(list) {
    const invalidIds = [ "989CG", "880RT" ]

    return list.filter(item => !invalidIds.includes(item.Id))
}

function productCardTemplate(product) {
  const clearanceIndicatorElement = product.IsClearance && `<p class="product-card__clearance-indicator">Clearance</p>` || "";
  const productCardElement = `<p class="product-card__price${ product.IsClearance && " clearance" || ""}">${formatCurrency(product.SuggestedRetailPrice)}</p>`;
  const productCardClearanceElement = product.IsClearance && `<p class="product-card__clearance-price">${formatCurrency(product.FinalPrice)}</p>` || "";
  const discountPercentage = parseFloat((product.SuggestedRetailPrice - product.FinalPrice)/product.SuggestedRetailPrice * 100).toFixed(2);
  const productCartPercentElement = product.IsClearance && `<p class="product-card__clearance-price">${discountPercentage}% off</p>` || "";

  return `<li class="product-card">
          <a href="../product_pages/index.html?product=${product.Id}">
            <img
              src="${product.Images.PrimaryMedium}"
              alt="${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            ${clearanceIndicatorElement}
            ${productCardElement}
            ${productCardClearanceElement}
            ${productCartPercentElement}</a>
        </li>`
}

export async function sortedProductList(selector, category, method="default") {
  let list = await getProductsByCategory(category);

  switch (method) {
    case "high-to-low":
      list.sort((a, b) => (a.IsClearance && a.FinalPrice || a.SuggestedRetailPrice) < (b.IsClearance && b.FinalPrice || b.SuggestedRetailPrice));
      break;
    case "low-to-high":
      list.sort((a, b) => (a.IsClearance && a.FinalPrice || a.SuggestedRetailPrice) > (b.IsClearance && b.FinalPrice || b.SuggestedRetailPrice));
      break;
    case "name-a-z":
      list.sort((a, b) => a.Name > b.Name);
      break;
    case "name-z-a":
      list.sort((a, b) => a.Name < b.Name);
      break;
    case "brand":
      list.sort((a, b) => a.Brand.Name > b.Brand.Name);
      break;
    case "clearance":
      list.sort((a, b) => !a.IsClearance)
      break;
    default:
      break;
  }

  renderListWithTemplate(productCardTemplate, selector, list, "afterbegin", true);
}

export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    // get the list of products 
    // render out the product list to the element
    let list = await getProductsByCategory(category)
    console.log(list);
    // let filteredList = filterList(list)
    
    renderListWithTemplate(productCardTemplate, selector, list)

    // selector.innerHTML = data
}