
import { getData } from "./productData.mjs"
import { renderListWithTemplate } from "./utils.mjs";

// function renderList(selector, productList) {
//     let htmlStrings = productList.map((item) => productCardTemplate(item));
//     selector.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
// }

function filterList(list) {
    const invalidIds = [ "989CG", "880RT" ]

    return list.filter(item => !invalidIds.includes(item.Id))
}

function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p class="product-card__price">${product.FinalPrice}</p></a>
          </li>`
}

export async function sortedProductList(selector, category, method="default") {
  let list = await getData(category);

  switch (method) {
    case "high-to-low":
      list.sort((a, b) => a.FinalPrice < b.FinalPrice);
      break;
    case "low-to-high":
      list.sort((a, b) => a.FinalPrice > b.FinalPrice);
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
  }

  renderListWithTemplate(productCardTemplate, selector, list, "afterbegin", true);
}

export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    // get the list of products 
    // render out the product list to the element
    let list = await getData(category)
    // let filteredList = filterList(list)
    
    renderListWithTemplate(productCardTemplate, selector, list)

    // selector.innerHTML = data
}