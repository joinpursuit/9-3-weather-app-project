const form = document.querySelector('form');
form.addEventListener("submit", (event)=> {
    event.preventDefault();
    const userInput = event.target.location.value;
    return weatherSearch(userInput);

});

const weatherSearch = (location) => {
    fetch("http://wttr.in/" + location + "?format=1j")
    .then((response)=> {
        return response.json();

    })
    .then((result) => {
        const {temp_F} = result.current_condition[0];
        const{areaName, country, region } = result.nearest_area[0];
        const{chanceOfRain, chanceOfSunshine, chanceOfSnow } = result.weather[0].hourly[0];
        console.log(chanceOfRain);

        const searchedTown = document.createElement('h2');
        searchedTown.innerText = location;
        const searchedArea = document.createElement('div');
        searchedArea.innerHTML = "Nearest Area" + areaName[0].value;
        const searchedRegion = document.createElement('div');
        searchedRegion.innerHTML = 'Region:' + region[0].value;
        const searchedCountry = document.createElement('div');
        searchedCountry.innerHTML = 'Country:' + country[0].value;
        const currentTemp = document.createElement('div');
        currentTemp.innerHTML = 'currently:' +temp_F;
        const sunshine = document.createElement('div');
        sunshine.innerHTML = 'Chance of Sunshine:' + chanceOfSunshine;
        const rain = document.createElement('div');
        rain.innerHTML = 'Chance of rain:' + chanceOfRain;
        const snow = document.createElement('div');
        snow.innerHTML = 'Chance of Snow:' + chanceOfSnow;
         
        general.append(
            searchedTown,
            searchedArea,
            searchedRegion,
            searchedCountry,
            currentTemp,
            sunshine,
            rain,
            snow
        );
            
    })
    .catch((error) => {
        console.log(error);
    }); 
};