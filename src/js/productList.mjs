
import { getProductsByCategory } from "./externalServices.mjs"
import { levenschteinDistance } from "./productSearch";
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
              <p class="product-card__price">$${product.FinalPrice}</p></a>
          </li>`
}

export async function sortedProductList(selector, query, method="default", useSearch=false) {
  let list;

  if (useSearch) {
    list = await getProductsBySearch(query);
  } else {
    list = await getProductsByCategory(query);
  }

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
    let list = await getProductsByCategory(category)
    // let filteredList = filterList(list)
    
    renderListWithTemplate(productCardTemplate, selector, list)

    // selector.innerHTML = data
}

export async function getProductsBySearch(search) {
  let list = [];

  const tents = await getProductsByCategory("tents");
  const backpacks = await getProductsByCategory("backpacks");
  const sleepingBags = await getProductsByCategory("sleeping-bags");
  const hammocks = await getProductsByCategory("hammocks");
  
  // Brute force since I don't know if there's a route to access all items
  for (let index in tents) {
    list.push(tents[index]);
  }

  for (let index in backpacks) {
    list.push(backpacks[index]);
  }

  for (let index in sleepingBags) {
    list.push(sleepingBags[index]);
  }

  for (let index in hammocks) {
    list.push(hammocks[index]);
  }

  const queryParts = search.split(" ");
  const processedList = [];

  for (let itemIndex in list) {
    let nameParts = list[itemIndex].Name.split(" ");
    let include = false

    for (let queryIndex in queryParts) {
      for (let nameIndex in nameParts) {
        let distanceResult = levenschteinDistance(queryParts[queryIndex], nameParts[nameIndex]);

        if (distanceResult < 2) {
          include = true
        }
      }
    }

    if (include) {
      processedList.push(list[itemIndex])
    }
  }

  return processedList;
}

export async function searchedProductList(selector, query) {
  // get the element we will insert the list into from the selector
  // get the list of products 
  // render out the product list to the element
  let list = await getProductsBySearch(query);

  renderListWithTemplate(productCardTemplate, selector, list)
}