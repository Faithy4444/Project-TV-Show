//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  
  for(let episode of episodeList){
    let elementContents = document.createElement("div")
    elementContents.classList.add("episode")


    elementContents.innerHTML = `<h4>${episode.name}-${episode.season}${episode.number}</h4>
    <img  src ="${episode.image.medium}" alt = "${episode.name}">
    <p>${episode.summary}</p>`
    rootElem.appendChild(elementContents) 
  }
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
