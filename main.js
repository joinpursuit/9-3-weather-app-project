const form = document.querySelector("#choose-a-location");

form.addEventListener("submit", (event)=> {
    event.preventDefault();
    
    let userCity = event.target["search-bar"].value;
    weatherDisplay(userCity);
});
function addToPrevious(userInput, currentTemp) {
    let ul =document.querySelector("ul");
}

function weatherDisplay(userInput) {

    fetch(`https://wttr.in/${userInput}?format=j1`)
    .then((res) => res.json())
    .then((file) => {
        
    })
}