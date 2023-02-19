const buttonCart = document.querySelector(".button-container");
const buttonClose = document.querySelector(".close-button");
const messageCart = document.querySelector(".message");
const mainContent = document.querySelectorAll(".section-card-first, .section-card-second");

buttonCart.addEventListener("click", () => {
    messageCart.style.visibility = "visible";
    mainContent.forEach(el => {
        el.style.opacity = "0.7";
    })
})

buttonClose.addEventListener("click", () => {
    messageCart.style.visibility = "hidden";
    mainContent.forEach(el => {
        el.style.opacity = "1";
    })
})