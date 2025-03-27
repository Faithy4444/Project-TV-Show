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
 

    elementContents.innerHTML = `<h4>${episode.name}- S${episode.season.toString().padStart(2, "0")}-E${episode.number.toString().padStart(2, "0")}</h4>
    <img  src ="${episode.image.medium}" alt = "${episode.name}">
    <p>${episode.summary}</p>`
    rootElem.appendChild(elementContents) 
  }
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

ggrthth
window.onload = setup;
