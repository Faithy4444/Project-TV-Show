//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const searchArea = document.getElementById("search");

//creating and appending the search input
const searchInput = document.createElement("input");
searchInput.classList.add("searchInput");
searchInput.type = "search";
searchInput.placeholder = "Search here .....";
searchArea.appendChild(searchInput);

//creating and appending the select dropdown
const selectOption = document.createElement("select");
searchArea.appendChild(selectOption);

//creating a span for episode count
const episodeCount = document.createElement("span");
episodeCount.style.marginLeft = "10px";
searchArea.appendChild(episodeCount);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchInput.addEventListener("input", () => filterEpisodes(allEpisodes));
}

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";

  for (let episode of episodeList) {
    let elementContents = document.createElement("div");
    elementContents.classList.add("episode");

    elementContents.innerHTML = `<h4>${episode.name}-${episode.season}${episode.number}</h4>
    <img  src ="${episode.image.medium}" alt = "${episode.name}">
    <p>${episode.summary}</p>`;
    rootElem.appendChild(elementContents);
  }
}
function filterEpisodes(episodeList) {
  const searchTerm = searchInput.value.trim().toLowerCase();
  console.log(searchTerm);
  const filteredEpisodes = episodeList.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
  );
  makePageForEpisodes(filteredEpisodes);
}
window.onload = setup;
