"use strict";

/* ------- GLOBAL FUNCTIONS START ------- */

// Button link START
function openLink(link) {
  window.open(link, "_blank");
}
// Button link END


// GET DATA recipe card json START
async function getDataCards() {
  const res = await fetch("./data.json");

  if(!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }
  const dataCard = await res.json();
  return dataCard;
} 
// GET DATA recipe card json END



/* ------- GLOBAL FUNCTIONS  END ------- */




// Hero Banner Mobile / Desktop START
heroBannerText();
function heroBannerText() {
  const bannerText =
  `   <h1>Vegan chocolate and nut brownies</h1>
      <p>These sumptuous brownies should be gooey on the inside and crisp on the  outside. A perfect indulgence!</p>
      <button>View recipe</button>`;


      const allBanners = [
        ...document.getElementsByClassName("header-text"),
        ...document.getElementsByClassName("header-text-mobile"),
      ];


      allBanners.forEach(banner => banner.innerHTML = bannerText);     

}



      const allButtons = [
              document.querySelector(".header-text > button"),
              document.querySelector(".header-text-mobile > button"),
            ];

            allButtons.forEach(button => {
              button.classList.add("button-link");
              button.setAttribute("type", "button");

              button.addEventListener("click", (e) => {
                e.preventDefault;
                openLink("https://dev-nespresso-test.pantheonsite.io/en/recipes/vegan-chocolate-and-nut-brownies");
              })
            });

// Hero Banner Mobile / Desktop END




// Active Link START



// Active Link END




// Filters GET DATA recipe card json START
contentCard();


async function contentCard() {
  const data = await getDataCards();
  const container = document.querySelector(".recipe-card");
  container.innerHTML = "";


  try {
    for (const recipe of data) {

      let div = document.createElement("div");
      document.querySelector(".recipe-card").appendChild(div);
      div.classList.add("recipe-card-item");
      div.dataset.lang = recipe.langcode;
      div.dataset.difficulty = recipe.field_difficulty;
      div.dataset.time = recipe.field_cooking_time;

      const cardImg = recipe.field_media_image;

      const src = cardImg.match(/src="([^"]+)"/)?.[1];
      const width = cardImg.match(/width="([^"]+)"/)?.[1];
      const height = cardImg.match(/height="([^"]+)"/)?.[1];
      const alt = cardImg.match(/alt="([^"]+)"/)?.[1];


      // Genereate recipe cards START

      div.innerHTML = `
        <div class="card-title">
          <p class="title">${recipe.title}</p>
        </div>
        <div class="card-text">
          <p><strong>Cooking Time: </strong>${recipe.field_cooking_time}</p>
          <p><strong>Difficulty: </strong>${recipe.field_difficulty}</p>
        </div>
        <div class="card-image">
          <img class="card-image" src="${
            "https://dev-nespresso-test.pantheonsite.io/" + src
          }" width="240" alt="${alt}">
        </div>
        </div>
        <div class="card-link">
          <a href="https://dev-nespresso-test.pantheonsite.io${recipe.view_node}" target="_blank">View Recipe &gt;</a>
        </div>
      `;

      // Genereate recipe cards END


      // Language Page recipe load START
      const siteLang = document.querySelector(".lang-switcher p");

      if (siteLang.innerHTML === "English") {
        if (recipe.langcode === "Spanish") {
          div.style.display = "none";
        }
      }
      // Language Page recipe load END


      // Filters START
      function applyFilter() {
        const selectedLang = document.querySelector(
            'input[name="lang"]:checked'
          ).value;

        const selectedDifficulty = document.querySelector("#filter-recipe-difficulty").value;
        const maxTime = parseInt(document.querySelector("#filter-recipe-time").value, 10);
        

        document.querySelectorAll(".recipe-card-item").forEach(div => {
          const recipeLang = div.dataset.lang;
          const recipeDifficulty = div.dataset.difficulty;
          const recipeTime = parseInt(div.dataset.time, 10);


          let visible = true;

          // Filter Language
          if (recipeLang !== selectedLang) visible = false;

          // Filter Recipe Difficulty
          if (selectedDifficulty !== "all" && recipeDifficulty !== selectedDifficulty) {
            visible = false;
          }
          
      // Filter Cooking Time
          if (maxTime > 0 && maxTime <= 15 && recipeTime !== 15) {
            visible = false;
          } else if (maxTime > 15 && maxTime < 30 && recipeTime !== 20) {
            visible = false;
          } else if (maxTime >= 30 && maxTime < 60 && recipeTime !== 30) {
            visible = false;
          } else if (maxTime >= 60 && recipeTime !== 60) {
            visible = false;
          }

          div.style.display = visible ? "grid" : "none";

        });
      }
      // Filters END


      // Filters Events START
      
      document.querySelectorAll("input[name='lang']").forEach(radio => {
        radio.addEventListener("change", applyFilter);
      });

      document.querySelector("#filter-recipe-difficulty").addEventListener("change", applyFilter);

      document.querySelector("#filter-recipe-time").addEventListener("input", applyFilter);
    
      // Filters Events END
      
      

    }
  } catch (error) {
         console.log(error);
  }
      
  
}



  // Filters GET DATA recipe card json END