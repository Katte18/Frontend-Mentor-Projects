const buttonCart = document.querySelector(".button-container");
const shoppingCart = document.querySelector(".shopping-cart-container");

const buttonClose = document.querySelector(".close-button");
const buttonContinueShopping = document.querySelector(".shopping-button");

const mainContent = document.querySelectorAll(".section-card-first, .section-card-second");

const currentPrice = document.querySelector(".current-price");

const inputQuantity = document.querySelector("#item-price");

const cartShoppingPrice = document.querySelector(".price");


buttonCart.addEventListener("click", () => {
    shoppingCart.style.visibility = "visible";

    mainContent.forEach(el => {
        el.style.opacity = "0.6";
    });
    inputQuantity.value = "";
    cartShoppingPrice.innerText = "";
});

// close button
buttonClose.addEventListener("click", () => {
    shoppingCart.style.visibility = "hidden";
    mainContent.forEach(el => {
        el.style.opacity = "1";
    });
    inputQuantity.value = "";
});

// continue shopping
buttonContinueShopping.addEventListener("click",() => {
    shoppingCart.style.visibility = "hidden";
     mainContent.forEach(el => {
        el.style.opacity = "1";
    })
});

// price calculation
inputQuantity.addEventListener("input", () => {
    let valueInput = inputQuantity.value;
    valueInput = parseFloat(valueInput);

    let itemPrice = currentPrice.innerText;
        itemPrice = parseFloat(itemPrice);
    
    if (typeof valueInput === "number" && valueInput >= 1) {
        let resultTotal = (valueInput * itemPrice).toFixed(2);
        cartShoppingPrice.innerHTML = resultTotal;
    } if (!valueInput || valueInput === null) {
        cartShoppingPrice.innerHTML = "";
    };  
});


