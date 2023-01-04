let textfield = document.querySelector("#cityInput");
let infoOutput = document.querySelector("main");
document.addEventListener("submit",(e)=>{
    e.preventDefault();
    let requestString = "https://wttr.in/" + textfield.value + "?format=j1";
    fetch(requestString).then((response) => response.json()).then((data) => {
        console.log(data)
        infoOutput.innerHTML = 
        `
        <p><strong>Are: </strong>${data.nearest_area[0].areaName[0].value}<p>
        <p><strong>Region: </strong>${data.nearest_area[0].region[0].value}<p>
        <p><strong>Country: </strong>${data.nearest_area[0].country[0].value}<p>
        <p><strong>Currently: </strong> Feels Like ${data.current_condition[0].FeelsLikeF}°<p>
        `
    })
});