"use strict";

const shareApi = {
  facebook: "https://www.facebook.com/sharer/sharer.php?u=",
  twitter: "https://twitter.com/intent/tweet?text=",
  pinterest: "http://pinterest.com/pin/create/button/?url=/node/?&description=",
};

// popup button
const userInfoShareBtn = document.querySelector(
  "div.user-info-right :not(share-popup)"
);

userInfoShareBtn.addEventListener("click", shareInfo);
function shareInfo() {
  const rightUserInfo = document.querySelector(".user-info-right");
  const leftUserInfo = document.querySelector(".user-info-left");
  rightUserInfo.classList.toggle("active");
  leftUserInfo.classList.toggle("hidden");
}

// social share button
const shareSocialsIcons = [...document.querySelectorAll(".share-popup a")];

shareSocialsIcons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (e.target.classList.contains("facebook")) {
      const navFacebook = shareApi.facebook;
      navSocials(navFacebook);
    } else if (e.target.classList.contains("twitter")) {
      const navTwitter = shareApi.twitter;
      navSocials(navTwitter);
    } else {
      const navPinterest = shareApi.pinterest;
      navSocials(navPinterest);
    }
  })
);

function navSocials(link) {
  const sharePage = document.documentURI;
  window.open(link + sharePage, "_blank");
}
