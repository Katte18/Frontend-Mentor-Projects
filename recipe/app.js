// function to add content horizontal line to the section
// except first and last section

function addSectionDivider() {
  const sectionEl = [...document.querySelectorAll("section")].slice(1, -1);
  for (let i = 0; i < sectionEl.length; i++) {
    sectionEl[i].style.borderBottom = "1px solid hsl(30, 18%, 87%)";
  }
  return sectionEl;
}

document.addEventListener("load", addSectionDivider());
