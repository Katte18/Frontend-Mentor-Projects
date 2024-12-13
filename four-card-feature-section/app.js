"use strict";

async function getDataCards() {
  const res = await fetch("./data.json");
  const dataCard = await res.json();

  return dataCard;
}

contentCard();
async function contentCard() {
  const articleCard = document.querySelector("article.card");
  const getDataCard = await getDataCards();
  try {
    for (const card of getDataCard.cards) {
      articleCard.innerHTML += `
          <div>
            <h2>${card.title}</h2>
            <p>${card.text}</p>
            <figure>
              <img src="${card.icon}" alt="${card.title} card">
            </figure>
          </div>`;
    }
        // align all cards with max height
    let cardItem = [...document.querySelectorAll(".card > div")];
    let cardItemMaxHeight = cardItem[0].offsetHeight;

    for (let i = 1; i < cardItem.length; i++) {
      if (cardItem[i].offsetHeight > cardItemMaxHeight) {
        cardItemMaxHeight = cardItem[i].offsetHeight;
      }
    }
    cardItem.map((i) => (i.style.height = cardItemMaxHeight * 1.3 + "px"));
  } catch ({ name, message }) {
    articleCard.innerHTML += `
        <h2>Error: ${name}</h2>
        <p>Cannot retrieve json file ${message}</p>
        <figure>
          <img src="${name}" alt="${name} card">
        </figure>`;
  }
}
