import checkoutProcess from "./checkoutProcess.mjs";
import { checkout } from "./externalServices.mjs";
import { loadHeaderFooter, updateCartItems } from "./utils.mjs";
loadHeaderFooter();
updateCartItems();

const orderSummary = document.querySelector(".order-summary");

const checkoutHandler = new checkoutProcess();
checkoutHandler.init("so-cart", orderSummary);

const zipInput = document.getElementById("zip");

if (zipInput.value) {
    checkoutHandler.calculateOrderTotal(zipInput.value);
}

zipInput.addEventListener("change", () => {
    checkoutHandler.calculateOrderTotal(zipInput.value)
})

const checkoutForm = document.getElementById("checkout-form");
checkoutForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const form = event.target;

    try {
        checkoutHandler.calculateOrderTotal(zipInput.value);
        const payload = await checkoutHandler.checkout(form)
        const response = await checkout(payload);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
})