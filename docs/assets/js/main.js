"use strict";let seriesList=[],favoriteSeriesList=[];const finalSeriesList=document.querySelector(".js-filmsList"),imageInstead="https://via.placeholder.com/210x295/ffffff/666666/? text=TV",finalFavoriteList=document.querySelector(".js-containerFavoritesList");function getApiSeries(){const s=document.querySelector(".js-input").value;fetch("//api.tvmaze.com/search/shows?q="+s).then(s=>s.json()).then(s=>{seriesList=s,paintSeriesList()})}const paintSeriesList=()=>{let s="";for(let t=0;t<seriesList.length;t++)null!==seriesList[t].show.image?(s+=`<li id="${t}" class="js-list">`,s+=`<img class="js-image" src="${seriesList[t].show.image.medium}"/>`,s+=`<h3 class="js-filmTitle">${seriesList[t].show.name}</h3>`,s+=`<button type="button" class="js-buttonToFavorites" alt="Añadir a favoritos"data-id="${t}">Añadir a favoritos</button>`,s+=`<p class="js-status">${seriesList[t].show.status}</p>`,s+="</li>"):(s+=`<li id="${t}" class="js-list">`,s+=`<img class="js-image" src="${imageInstead}"/>`,s+=`<h3 class="js-filmTitle">${seriesList[t].show.name}</h3>`,s+=`<button type="button" class="js-buttonToFavorites" alt="Añadir a favoritos" data-id="${t}">Añadir a favoritos</button>`,s+=`<p class="js-status">${seriesList[t].show.status}</p>`,s+="</li>");finalSeriesList.innerHTML=s,listenFavoriteList()},listenFavoriteList=()=>{const s=document.querySelectorAll(".js-list");for(const t of s)t.addEventListener("click",addFavorite)},addFavorite=s=>{const t=parseInt(s.currentTarget.id);if(console.log(s.currentTarget.id),-1!==favoriteSeriesList.indexOf(seriesList[t])){const s=favoriteSeriesList.indexOf(seriesList[t]);favoriteSeriesList.splice(s,1)}else favoriteSeriesList.push(seriesList[t]);paintFavoriteList(),setLocalStorage()};function paintConsole(){for(let s=0;s<favoriteSeriesList.length;s++)console.log(favoriteSeriesList[s].show.name)}const paintFavoriteList=()=>{let s="";for(const t of favoriteSeriesList)null!==t.show.image?(s+='<li class="js-favoritesList">',s+=`<img src="${t.show.image.medium}" class="js-imageFav">`,s+=`<h3 class="js-listFav">${t.show.name}</h3>`,s+=`<button type="button" class="js-removeFromFavorites" alt="Sacar de favoritos" data-id="${t.show.id}">Eliminar de Favoritos</button>`,s+="</li>"):(s+='<li class="js-favoritesList">',s+=`<img src="${imageInstead}" class="js-imageFav">`,s+=`<h3 class="js-listFav">${t.show.name}</h3>`,s+=`<button type="button" class="js-removeFromFavorites" alt="Sacar de favoritos" data-id="${t.show.id}">Eliminar de Favoritos</button>`,s+="</li>");finalFavoriteList.innerHTML=s,listenFavoriteList()},button=document.querySelector(".js-button");button.addEventListener("click",getApiSeries);const getFromLocalStorage=()=>{const s=localStorage.getItem("favoriteList");null!==s&&(favoriteSeriesList=JSON.parse(s),paintFavoriteList())},setLocalStorage=()=>{const s=JSON.stringify(favoriteSeriesList);localStorage.setItem("favoriteList",s)};getFromLocalStorage();