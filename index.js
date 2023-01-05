const base_URL = 'https://wttr.in';

const main = document.querySelector("main");
const form = document.querySelector("form");
const h2 = document.createElement("h2");
const article = document.querySelector("article");

const area = document.createElement("p");
const region = document.createElement("p");
const country = document.createElement("p");
const currently = document.createElement("p");

const today = document.createElement("h3")
const tomorrow = document.createElement("h3")
const afterTomorrow = document.createElement("h3")





form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const location = document.querySelector('input').value;
  getWeather(location);    
  form.reset();

})



function getWeather(location){
    fetch(`${base_URL}/${location}?format=j1`)
    .then((response) => response.json())
    .then((result) => {
        
        weatherCard(result);
        threeDaysForecast(result);
        previousSearches(result, location);

    })
      .catch((error) => console.log(error));
}




function weatherCard(result){
    h2.innerHTML = result.nearest_area[0].areaName[0].value
    article.append(h2)

    const p = document.querySelector("p")
    p.remove();

    article.append(area);
    article.append(region);
    article.append(country);
    article.append(currently);

    area.innerHTML = "Area:";
    region.innerHTML = "Region:";
    country.innerHTML = "Country:";
    currently.innerHTML = "Currently:";

    area.innerHTML += " " + result.nearest_area[0].areaName[0].value;
    region.innerHTML += " " + result.nearest_area[0].region[0].value;
    country.innerHTML += " " + result.nearest_area[0].country[0].value;
    currently.innerHTML += " Feels Like " + result.current_condition[0].FeelsLikeF + "°F";



}

function threeDaysForecast(result) {
    const forecast = document.querySelectorAll("aside article")


    today.innerHTML = "Today";
    forecast[0].append(today)


    tomorrow.innerHTML = "Tomorrow";
    forecast[1].append(tomorrow)


    afterTomorrow.innerHTML = "Day After Tomorrow";
    forecast[2].append(afterTomorrow);



    // if (forecast[0].innerHTML === '') {
    for (let i = 0; i < forecast.length; i++) {
        const averageTemp = document.createElement("p");
        const maxTemp = document.createElement("p");
        const minTemp = document.createElement("p");

        averageTemp.innerHTML = "Average Temperature: " + result.weather[i].avgtempF + "°F";
        maxTemp.innerHTML = "Max Temperature: " + result.weather[i].maxtempF + "°F";
        minTemp.innerHTML = "Min Temperature: " + result.weather[i].mintempF + "°F";

        forecast[i].append(averageTemp)
        forecast[i].append(maxTemp)
        forecast[i].append(minTemp)
    }
    // }






}
function previousSearches(result, location) {
    if (document.querySelector(".remove")) {
        document.querySelector(".remove").remove();
    }

    const a = document.createElement("a");
    const p = document.createElement("p");

    const li = document.createElement("li");
    document.querySelector("ul").append(li);

    li.append(p);

    const listOfAs = document.querySelectorAll("li p a")
    console.log(listOfAs)

    a.setAttribute("href", "#");
    a.innerHTML = result.nearest_area[0].areaName[0].value;
    p.innerHTML = " - " + result.current_condition[0].FeelsLikeF + "°F";

    p.prepend(a);

    for (let i = 0; i < listOfAs.length; i++) {

        if (listOfAs[i].innerHTML === result.nearest_area[0].areaName[0].value) {
            li.remove()
        }
    }

}

// }
//     // card.classList.add("car");

//     const locationName = document.createElement("h2");
//    // locationName.innerHTML = result.nearest_area[0].areaName[0].value;
//     locationName.innerHTML = ;
//     document.querySelector("article").append(locationName)
//     // console.log(locationName)




//wttr.in/Detroit?format=j1




// const form = document.querySelector("form");
// form.addEventListener("submit", (event) => {
//   event.preventDefault(); // doesn't refresh
//   const { id } = event.target; //deconstruct event.target
//   // const id = event.target.id
//   getPokemonByID(id.value); //pass id value to our getPokemonByID func
//   form.reset();
// });

// function getPokemonByID(id) {
//   fetch(`${BASE_URL}/${id}`)
//     .then((response) => response.json()) // promise we're expecting from the api - parsing json into JS
//     .then((result) => {
//       const pokemon = createPokemonArticle(result);
//       document.querySelector(".pokemon").append(pokemon);
//     }) // the result
//     .catch((error) => {
//       const message = createErrorMessage(error);
//       document.querySelector("main").append(message);
//     }); // the error
// }

// function createPokemonArticle(pokemon) {
//   // creating pokemon article for pokemon section
//   const article = document.createElement("article");
//   article.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
//     <h2>${pokemon.name} (#${pokemon.order})</h2>
//   `;
//   return article;
// }

// function createErrorMessage(message) {
//   // creating error section
//   const section = document.createElement("section");
//   section.classList.add("error");
//   section.innerHTML = `
//       <p>There was an error!</p>
//       <p class="message">${error}</p>
//     `;
//   return section;
// }
