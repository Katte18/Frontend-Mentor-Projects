(function datePublish() {
  const publishDate = document.querySelector(".publish-date");

  let currentDate = new Date();

  const prevDate = currentDate.setDate(currentDate.getDate() - 2);
  const formatDate = new Date(prevDate).toDateString();
  const arrDate = formatDate.split(" ");

  return (publishDate.innerHTML = `${arrDate[2]} ${arrDate[1]} ${
    arrDate[arrDate.length - 1]
  }`);
})();
