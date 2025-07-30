fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("recipe-card-item");

      const src = item.field_media_image.match(/src="([^"]+)"/)?.[1];
      const width = item.field_media_image.match(/width="([^"]+)"/)?.[1];
      const height = item.field_media_image.match(/height="([^"]+)"/)?.[1];

      const alt = item.field_media_image.match(/alt="([^"]+)"/)?.[1];
      card.innerHTML = `
        <div class="card-title">
          <p class="title">${item.title}</p>
        </div>
        <div class="card-text">
          <p><strong>Cooking Time: </strong>${item.field_cooking_time}</p>
          <p><strong>Difficulty: </strong>${item.field_difficulty}</p>
        </div>
        <div class="card-image">
          <img class="card-image" src="${
            "https://dev-nespresso-test.pantheonsite.io/" + src
          }" width="${width}" height="${height}" alt="${alt}">
        </div>
        </div>
        <div class="card-link">
          <a href="recipes/victoria-sponge-cake.html">View Recipe &gt;</a>
        </div>
      `;

      document.querySelector(".recipe-card").appendChild(card);

      // Cooking Time filter
      let recipeTime = document.getElementById("filter-recipe-time");
      recipeTime.addEventListener("change", () => {
        const time = recipeTime.value;

        if (time.toLowerCase() === "under-30-minutes") {
          if (item.field_cooking_time.toLowerCase() === "under 30 minutes") {
            card.style.display = "grid";
          } else {
            card.style.display = "none";
          }
        } else if (time.toLowerCase() === "30-to-60-minutes") {
          if (item.field_cooking_time.toLowerCase() === "30 to 60 minutes") {
            card.style.display = "grid";
          } else {
            card.style.display = "none";
          }
        } else {
          card.style.display = "grid"; // Show all cards if "All" is selected
        }
      });

      // Language filter functionality
      const siteLang = document.querySelector(".lang-switcher p");

      if (siteLang.innerHTML === "English") {
        if (item.langcode === "Spanish") {
          card.style.display = "none";
        }
      }

      const langFilter = document.querySelectorAll('input[name="lang"]');
      langFilter.forEach((radio) => {
        radio.addEventListener("change", () => {
          const selectedLang = document.querySelector(
            'input[name="lang"]:checked'
          ).value;
          if (item.langcode === "Spanish") {
            card.style.display = "none";
          }
          if (selectedLang === "en") {
            if (item.langcode === "English") {
              card.style.display = "grid";
            } else {
              card.style.display = "none";
            }
          } else if (selectedLang === "es") {
            if (item.langcode === "Spanish") {
              card.style.display = "grid";
            } else {
              card.style.display = "none";
            }
          }
        });
      });
      // Recipe Difficulty filter
      recipeDifficulty = document.getElementById("filter-recipe-difficulty");

      recipeDifficulty.addEventListener("change", () => {
        const difficulty = recipeDifficulty.value;

        if (difficulty.toLowerCase() === "easy") {
          if (item.field_difficulty.toLowerCase() === "easy") {
            card.style.display = "grid";
          } else {
            card.style.display = "none";
          }
        } else if (difficulty.toLowerCase() === "medium") {
          if (item.field_difficulty.toLowerCase() === "medium") {
            card.style.display = "grid";
          } else {
            card.style.display = "none";
          }
        } else {
          card.style.display = "grid"; // Show all cards if "All" is selected
        }
      });
    });
  });
