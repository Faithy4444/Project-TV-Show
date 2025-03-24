//You can edit ALL of the code here
const rootElem = document.getElementById("root");

const searchArea = document.getElementById("search");

const searchInput = document.createElement("input");
searchInput.type = "search";
searchInput.placeholder = "Search here .....";

searchArea.appendChild(searchInput);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  //const rootElem = document.getElementById("root");

  for (let episode of episodeList) {
    let elementContents = document.createElement("div");
    elementContents.classList.add("episode");

    elementContents.innerHTML = `<h4>${episode.name}-${episode.season}${episode.number}</h4>
    <img  src ="${episode.image.medium}" alt = "${episode.name}">
    <p>${episode.summary}</p>`;
    rootElem.appendChild(elementContents);
  }
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
