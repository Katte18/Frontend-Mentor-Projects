"use strict";

/* ------- GENERAL FUNCTIONS START ------- */



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

  return await res.json();
} 
// GET DATA recipe card json END


// Filter Time Cooking START
function isTimeVisible(recipeTime, maxTime) {
  if(!maxTime || maxTime <= 0) return true;
  return recipeTime <= maxTime;
}

// Filter Time Cooking END


/* ------- GENERAL FUNCTIONS  END ------- */




// Hero Banner Mobile / Desktop START
heroBannerText();
function heroBannerText() {
  const bannerText =
    ` <h1>Vegan chocolate and nut brownies</h1>
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






// Filters GET DATA recipe card json START
contentCard();


async function contentCard() {
  const container = document.querySelector(".recipe-card");

  try {
    const data = await getDataCards();

    // no data in json file or empty error handler START
    if(!Array.isArray(data) || data.length === 0) {
      throw new Error ("Data is missing or has a new format.");
    }
    // no data in json file or empty error handler END

    container.innerHTML = "";

    
    for (const recipe of data) {

      let div = document.createElement("div");
      document.querySelector(".recipe-card").appendChild(div);
      div.classList.add("recipe-card-item");
      div.dataset.lang = recipe.langcode;
      div.dataset.difficulty = recipe.field_difficulty;
      div.dataset.time = recipe.field_cooking_time;


      class ImgParser {
        constructor(html) {
          this.html = html;
        }

        get(attr) {
          return this.html.match(new RegExp(`${attr}="([^"]+)"`))?.[1] || "";
        }
      }

      const parser = new ImgParser(recipe.field_media_image);
      const src = parser.get("src");
      const alt = parser.get("alt");

      // NOT USED IN IMG ELEMENT ----------
      // const width = parser.get("width");
      // const height = parser.get("height");
      // NOT USED IN IMG ELEMENT ----------


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
        const selectedLang = document.querySelector('input[name="lang"]:checked').value;
        const selectedDifficulty = document.querySelector("#filter-recipe-difficulty").value;
        const maxTime = parseInt(document.querySelector("#filter-recipe-time")?.value, 10) || 0;
        

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

          // Filter Time Cooking
          if (!isTimeVisible(recipeTime, maxTime)) visible = false;
        

          

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
         container.innerHTML = 
         `<div>
            <p>No Result Found</p>
            <p>${error}</p>
         </div>`;
  }
      
  
}



  // Filters GET DATA recipe card json END