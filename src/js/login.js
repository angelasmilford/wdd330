import { login } from "./auth.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();
const redirect = getParams("redirect");

const loginButton = document.querySelector("#login-button");
const emailBox = document.querySelector("#email");
const passwordBox = document.querySelector("#password");

loginButton.addEventListener('click', () => {
    const email = emailBox.value;
    const password = passwordBox.value;
    login({email, password}, redirect);
})

