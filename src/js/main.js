'use strict';

let seriesList = [];
let favoriteSeriesList = [];
const finalSeriesList = document.querySelector(".js-filmsList");
const imageInstead = "https://via.placeholder.com/210x295/ffffff/666666/? text=TV";
const finalFavoriteList = document.querySelector(".js-containerFavoritesList");



//get the api
function getApiSeries(){
  const seriesNames = document.querySelector(".js-input").value;
  fetch(`//api.tvmaze.com/search/shows?q=${seriesNames}`)
    .then(response => response.json())
    .then(data => {
      seriesList = data;
      paintSeriesList();
    });
}





//create series menu

const paintSeriesList = () => {
  let htmlCode = '';
  for (let i =0; i < seriesList.length; i++) {
    if (seriesList[i].show.image !== null)  {
      htmlCode += `<li id="${i}" class="js-list">`;
      htmlCode += `<img class="js-image" src="${seriesList[i].show.image.medium}"/>`;
      htmlCode += `<h3 class="js-filmTitle">${seriesList[i].show.name}</h3>`;
      htmlCode += `<button type="button" class="js-buttonToFavorites" alt="Añadir a favoritos"data-id="${i}">Añadir a favoritos</button>`;
      htmlCode += `<p class="js-status">${seriesList[i].show.status}</p>`;
      htmlCode += `</li>`;
    } else  {
      htmlCode += `<li id="${i}" class="js-list">`;
      htmlCode += `<img class="js-image" src="${imageInstead}"/>`;
      htmlCode += `<h3 class="js-filmTitle">${seriesList[i].show.name}</h3>`;
      htmlCode += `<button type="button" class="js-buttonToFavorites" alt="Añadir a favoritos" data-id="${i}">Añadir a favoritos</button>`;
      htmlCode += `<p class="js-status">${seriesList[i].show.status}</p>`;
      htmlCode += `</li>`;
    }
  }
  finalSeriesList.innerHTML = htmlCode;
  listenFavoriteList();
};




//create favorite list

const listenFavoriteList = () => {
  const buttonToFavourites = document.querySelectorAll(".js-list");
  for (const favoriteButton of buttonToFavourites) {
    favoriteButton.addEventListener('click', addFavorite);
  }
};



const addFavorite = (ev) => {
  const clickFavorite = parseInt(ev.currentTarget.id);
  console.log(ev.currentTarget.id);
  if(favoriteSeriesList.indexOf(seriesList[clickFavorite])!== -1){
    const searchSerie = favoriteSeriesList.indexOf(seriesList[clickFavorite]);
    favoriteSeriesList.splice(searchSerie,1);
  }else{
    favoriteSeriesList.push(seriesList[clickFavorite]);
  }
  paintFavoriteList();
  setLocalStorage();
};



function paintConsole() {
  for (let i = 0; i < favoriteSeriesList.length; i++) {
    console.log(favoriteSeriesList[i].show.name);
  }
}


//const logButton = document.querySelector(".js-logButton");
//logButton.addEventListener('click', paintConsole);



const paintFavoriteList = () => {
  let htmlCode = '';
  for (const serie of favoriteSeriesList) {
    if (serie.show.image !== null)  {
      htmlCode += `<li class="js-favoritesList">`;
      htmlCode += `<img src="${serie.show.image.medium}" class="js-imageFav">`;
      htmlCode += `<h3 class="js-listFav">${serie.show.name}</h3>`;
      htmlCode += `<button type="button" class="js-removeFromFavorites" alt="Sacar de favoritos" data-id="${serie.show.id}"></button>`;
      htmlCode += '</li>';
    } else{
      htmlCode += `<li class="js-favoritesList">`;
      htmlCode += `<img src="${imageInstead}" class="js-imageFav">`;
      htmlCode += `<h3 class="js-listFav">${serie.show.name}</h3>`;
      htmlCode += `<button type="button" class="js-removeFromFavorites" alt="Sacar de favoritos" data-id="${serie.show.id}"></button>`;
      htmlCode += '</li>';
    }
  }
  finalFavoriteList.innerHTML = htmlCode;
  listenFavoriteList();
};


const button = document.querySelector(".js-button");
button.addEventListener("click", getApiSeries);


// local storage

const getFromLocalStorage = () => {
  const localStorageData = localStorage.getItem('favoriteList');
  if (localStorageData !== null)  {
    favoriteSeriesList = JSON.parse(localStorageData);
    paintFavoriteList();
  }
};

const setLocalStorage = () => {
  const stringifyFav = JSON.stringify(favoriteSeriesList);
  localStorage.setItem('favoriteList', stringifyFav);
};


getFromLocalStorage();