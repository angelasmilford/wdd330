// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position="afterbegin", clear=false) {
  let htmlStrings = list.map((item) => templateFn(item));
  
  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export async function renderWithTemplate(templateFn, parentElement, data, position="afterbegin", clear=false, callback) {
  const template = await templateFn();

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, template);

  if(callback){
    callback(data);
  }
}

export function loadTemplate(path) {
  return async function() {
    const response = await fetch(path);

    if (response.ok) {
      const text = await response.text();
      return text;
    } else {
      throw new Error(`Failed to load template: ${path}`);
    }
  }
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");

  renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer)
}

export function updateCartItems() {
  let cartContents = getLocalStorage("so-cart");
  let itemCount = cartContents.reduce((accum, item) => accum + item.multiple, 0);

  // Unsure if this is the best way to wait for the cart-item element to load in, but this is what I've got.
  let timerId = setInterval(() => {
    const cartItems = document.querySelector(".cart-items");
  
    if (cartItems) {
      if (itemCount > 0) {
        if (cartItems.classList.contains("hide")) cartItems.classList.remove("hide");
        cartItems.textContent = itemCount;
      } else {
        if (!cartItems.classList.contains("hide")) cartItems.classList.add("hide");
      }
      // Clear interval timer once the element has loaded:
      clearInterval(timerId);
    }
  }, 100);
}

export function alertMessage(message, scroll=true){
  const main = document.querySelector("main");
  
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.textContent = message;

  alert.addEventListener('click', function(e) {
    if(e.target.classList.contains('close-button')) {
      alert.remove();
    }
  })

  main.prepend(alert);

  if(scroll){
    window.scrollTo(0, 0);
  }
}