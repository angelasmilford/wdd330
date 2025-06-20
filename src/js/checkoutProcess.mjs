import { getLocalStorage, formatCurrency } from "./utils.mjs"

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        // console.log(item)
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.multiple,
        }
    })
    
    return simplifiedItems;
}

export default class checkoutProcess {
    key = "";
    list = [];
    outputSelector = "";
    itemTotal = 0;
    orderTotal = 0;
    shipping = 0;
    tax = 0;

    init(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    };

    calculateItemSummary = function() {
        this.subTotal = this.list.reduce((final, item) => final += item.FinalPrice * item.multiple, 0);
        this.totalItems = this.list.reduce((final, item) => final += item.multiple, 0);
        // this.totalItems = this.list.length;
        // const totalLabel = document.querySelector(".item-label");

        // // Convert the total price in the cart to a formatted USD string.
        // const formattedTotal = new Intl.NumberFormat("en-US", {
        //     style: "currency",
        //     currency: "USD",
        // }).format(this.subTotal);

        // totalLabel.textContent = formattedTotal;
    };

    calculateOrderTotal = function(zip) {
        this.zip = zip;

        if (!this.zip) {
            console.error("Zipcode is required to calculate tax!");
            return
        }

        let shipping = 10;

        if (this.totalItems - 1 > 0) {
            shipping += (this.totalItems - 1) * 2
        }

        this.shipping = shipping;
        this.tax = this.subTotal * 0.06;
        this.orderTotal = this.subTotal + this.shipping + this.tax;

        this.displayOrderTotals();
    }

    displayOrderTotals = function() {
        const subTotalSpan = this.outputSelector.querySelector(".sub-total-count");
        const shippingSpan = this.outputSelector.querySelector(".shipping-estimate");
        const taxSpan = this.outputSelector.querySelector(".tax");
        const orderTotalSpan = this.outputSelector.querySelector(".order-total");

        subTotalSpan.textContent = formatCurrency(this.subTotal);
        shippingSpan.textContent = formatCurrency(this.shipping);
        taxSpan.textContent = formatCurrency(this.tax);
        orderTotalSpan.textContent = formatCurrency(this.orderTotal);
    }

    checkout = async function(form) {
        const formData = new FormData(form)
        const convertedJson = {}

        formData.forEach((value, key) => {
            convertedJson[key] = value
        });
        
        const currentDate = new Date()
        convertedJson.orderDate = currentDate.toISOString();
        convertedJson.items = packageItems(this.list);
        convertedJson.orderTotal = `${this.orderTotal}`;
        convertedJson.shipping = this.shipping;
        convertedJson.tax = `${this.tax}`;
        
        return convertedJson;

        try{
            window.location.href="checkout/success.html";
            localStorage.removeItem(this.key);
        } catch(err){
            console.error("Checkout failed:", err);
            alert("There was an error processing your order. Please try again.");
        }
    }
}