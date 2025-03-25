//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const searchArea = document.getElementById("search");

//Creating a container for the searchInput and the drop down list
const searchContainer = document.createElement("div");
searchContainer.classList.add("search-container");
searchArea.appendChild(searchContainer);

//creating and appending the search input
const searchInput = document.createElement("input");
searchInput.classList.add("searchInput");
searchInput.type = "search";
searchInput.placeholder = "Search here .....";
searchContainer.appendChild(searchInput);

//creating and appending the select dropdown
const selectOption = document.createElement("select");
searchContainer.appendChild(selectOption);

//creating a span for episode count
const episodeCount = document.createElement("span");
episodeCount.style.marginLeft = "10px";
searchArea.appendChild(episodeCount);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  populateDropdown(allEpisodes);

  searchInput.addEventListener("input", () => {
    filterEpisodes(allEpisodes);
    updateDropdown(allEpisodes);
  });

  selectOption.addEventListener("change", () => {
    filterByDropDownSelection(allEpisodes);
    searchInput.value = "";
  });
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

//This is a function to populate the dropdown list
function populateDropdown(episodeList) {
  selectOption.innerHTML = `<option value="all">All Episodes</option>`;
  episodeList.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.name;
    option.textContent = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")} - ${episode.name}`;
    selectOption.appendChild(option);
  });
}
// This is a function to filter the list by dropdown selection
function filterByDropDownSelection(episodeList) {
  const selectedValue = selectOption.value;
  if (selectedValue === "all") {
    makePageForEpisodes(episodeList);
  } else {
    const selectedEpisode = episodeList.find(
      (episode) => episode.name == selectedValue
    );
    makePageForEpisodes(selectedEpisode ? [selectedEpisode] : []);
  }
}

const updateDropdown = (filteredEpisodes) => {
  selectOption.innerHTML = `<option value="all">All Episodes</option>`;
  filteredEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.name;
    option.textContent = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")} - ${episode.name}`;
    selectOption.appendChild(option);
  });
};

window.onload = setup;
