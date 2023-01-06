// const BASE_URL = `https://wttr.in/${plusify(input)}`

// https://github.com/chubin/wttr.in


// Header For Weather App 

/* Contains a Search Form which requires user input of a valid city.

Things to consider:
- Cannot be empty (throw an error)
- If the input is more than one word, the request URL must have the spaces replaced with "+"s. example: https//wttr.in/Salt+Lake+City
-If there are two cities with the same name, the user should add the state that the city is in to refine search results.
*/


// const tempConversionClass = document.querySelector("form.temperature-conversion");
// Form with temperature-conversion class

// Event listener for submit button. Takes text input.
const search = document.querySelector("form.search");
// Form with search class
search.addEventListener("submit", (event) => {
    event.preventDefault();

    // const input = document.querySelector("input[type='text']");
    const input = document.querySelector('input').value
    // user input
    // console.log(input)
    

//    const location = event.target.input.value;
//    console.log(location)
// console.log(plusify(input))

//  See the text disappear from the search bar.
search.reset();

// Write a function that converts the user input into a string where each space is replaced with a "+". plusify();

// API Fetch
fetch(`https://wttr.in/${plusify(input)}?format=j1`)
.then((response) => response.json())
  .then((json) => {

    /*If the search returns results:
 <p class="empty"> should be removed.*/
const empty = document.querySelector('p.empty');
if (empty) {
    empty.remove();
unhideCurrentClass(current)
}

    console.log(json);
  })
  .catch((error) => {
    console.log(error)
  });

/* If the search returns results:
- <p class="empty"> should be removed.

- The 3-day forecast should appear within its respective grid cell <article class="today/tomorrow/day-after-tm">
- should also store searches with the name and current 'feels like' temperature in the sidebar
- If the sidebar link is clicked, the main section should be replaced with that weather information. (The link can be connected to a function that performs the fetch.) "aside section a"
- !* after clicking the sidebar link, another entry for the same location should not be made. If a link in the sidebar is clicked, don't add a new ul li element.
 */
})