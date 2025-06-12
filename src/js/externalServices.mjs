const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  const jsonResponse = res.json();

  if (res.ok) { 
    return jsonResponse;
  } else {
    //throw new Error("Bad Response");
    throw {name: "servicesError", message: jsonResponse};
  }
}

export async function getProductsByCategory(category) {
  return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function findProductById(id) {
  return fetch(baseURL + `product/${id}`)
  .then(convertToJson)
  .then((data) => data.Result);
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }
  
  return await fetch(baseURL + "checkout/", options).then(jsonResponse);
}