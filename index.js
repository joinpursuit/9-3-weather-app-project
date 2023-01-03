const base_URL = 'https://wttr.in';

const form = document.querySelector("form");
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const location = document.querySelector('input').value;
  getWeather(location);    
  form.reset();
  console.log(location)
})

//const location = document.createElement("h2");
//console.log(location)

function getWeather(location){
    fetch(`${base_URL}/${location}?format=j1`)
    .then((response) => response.json())
    .then((result) => {
        
       const weather = weatherCard(result); 
       const main =  document.querySelector("main");
       main.append(location)
    })
      .catch((error) => console.log(error));
}




function weatherCard(result){
//     // card.classList.add("car");

//     const locationName = document.createElement("h2");
//    // locationName.innerHTML = result.nearest_area[0].areaName[0].value;
//     locationName.innerHTML = ;
//     document.querySelector("article").append(locationName)
//     // console.log(locationName)
}



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
