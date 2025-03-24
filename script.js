//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const searchArea = document.getElementById("search");

//creating and appending the search input
const searchInput = document.createElement("input");
searchInput.classList.add("searchInput");
searchInput.type = "search";
searchInput.placeholder = "Search here .....";
searchArea.appendChild(searchInput);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchInput.addEventListener("input", () => filterEpisodes(allEpisodes));
}

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";

  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

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
