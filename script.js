//You can edit ALL of the code here
/*****************************************************************
Fetching Data
 *****************************************************************/
episodeList = []
function getAllEpisodes() {
 return fetch("https://api.tvmaze.com/shows/82/episodes")
.then(function(data){
  if(!data.ok){
    throw new Error("Failed to fetch episodes.")
  }
  return data.json()
})
.catch(error => {
  displayErrorMessage("Error occurred while fetching. Please try again")
  return[]
})
}
/*****************************************************************
Functions to display error message and loading message
 *****************************************************************/
function displayLoadingMessage(message) {
  rootElem.innerHTML = `<p class='message'>${message}</p>`;
}

function displayErrorMessage(message) {
  rootElem.innerHTML = `<p class='error'>${message}</p>`;
}

const rootElem = document.getElementById("root");
const searchArea = document.getElementById("search");

/*****************************************************************
 Creating a container for the searchInput and the drop down list
 *****************************************************************/
const searchContainer = document.createElement("div");
searchContainer.classList.add("search-container");
searchArea.appendChild(searchContainer);

/*********************************************
 creating and appending the select dropdown
 *********************************************/
const selectOption = document.createElement("select");
searchContainer.appendChild(selectOption);

/***************************************************
 creating and appending the search input
 ****************************************************/
const searchInput = document.createElement("input");
searchInput.classList.add("searchInput");
searchInput.type = "search";
searchInput.placeholder = "Search here .....";
searchContainer.appendChild(searchInput);

/*************************************
creating a span for episode count
*************************************/
const episodeCount = document.createElement("span");
episodeCount.classList.add("episodeCount");
episodeCount.style.marginLeft = "10px";
searchContainer.appendChild(episodeCount);

function setup() {
  displayLoadingMessage("Episodes loading please wait...")
  getAllEpisodes().then((allEpisodes) => {
  renderEpisodes(allEpisodes);
  populateDropdown(allEpisodes);
  updateEpisodeCount(allEpisodes.length, allEpisodes.length);

  searchInput.addEventListener("input", () => {
    const filteredEpisodes = filterEpisodes(allEpisodes);
    updateDropdown(allEpisodes);
    updateEpisodeCount(filteredEpisodes.length, allEpisodes.length);
  });

  selectOption.addEventListener("change", () => {
    filterByDropDownSelection(allEpisodes);
    searchInput.value = "";
  });
});
}

function renderEpisodes(episodeList) {

  rootElem.innerHTML = "";

  for (let episode of episodeList) {
    let elementContents = document.createElement("div");
    elementContents.classList.add("episode");

    elementContents.innerHTML = `<h4>${episode.name}- S${episode.season.toString().padStart(2, "0")}-E${episode.number.toString().padStart(2, "0")}</h4>

    <img  src ="${episode.image.medium}" alt = "${episode.name}">
    <p>${episode.summary}</p>`;
    rootElem.appendChild(elementContents);
  }
}
/*********************************************************************
 This is a function to filter episodes according to search
********************************************************************** */

const filterEpisodes = (episodeList) => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  console.log(searchTerm);
  const filteredEpisodes = episodeList.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
  );
  renderEpisodes(filteredEpisodes);
  updateEpisodeCount(filteredEpisodes.length, episodeList.length);
  return filteredEpisodes;
};

/************************************************************************
 This is a function to populate the dropdown list
************************************************************************* */

const populateDropdown = (episodeList) => {
  selectOption.innerHTML = `<option value="all">All Episodes</option>`;
  episodeList.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.name;
    option.textContent = `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")} - ${episode.name}`;
    selectOption.appendChild(option);
  });
};

/********************************************************************
 This is a function to filter the list by dropdown selection
 ****************************************************************** */

const filterByDropDownSelection = (episodeList) => {
  const selectedValue = selectOption.value;
  if (selectedValue === "all") {
    renderEpisodes(episodeList);
    updateEpisodeCount(episodeList.length, episodeList.length);
  } else {
    const selectedEpisode = episodeList.find(
      (episode) => episode.name == selectedValue
    );
    renderEpisodes(selectedEpisode ? [selectedEpisode] : []);
    updateEpisodeCount(selectedEpisode ? 1 : 0, episodeList.length);
  }
};

/*****************************************************************************************
 This is a a function to update the dropdown list, to select and show the selected episode
 **************************************************************************************** */
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

/*********************************************************************************************
 Function to count the number of episodes 
 ************************************************************************************************/

function updateEpisodeCount(matchedCount, totalCount) {
  episodeCount.textContent = `Displaying ${matchedCount}/ ${totalCount}episodes`;
}
window.onload = setup;
