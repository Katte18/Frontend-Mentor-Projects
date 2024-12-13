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

  } catch ({ name, message }) {
    articleCard.innerHTML += `
        <h2>Error: ${name}</h2>
        <p>Cannot retrieve json file ${message}</p>
        <figure>
          <img src="${name}" alt="${name} card">
        </figure>`;
  }
}
