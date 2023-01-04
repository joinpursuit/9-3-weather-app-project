let textfield = document.querySelector("#cityInput");
let infoOutput = document.querySelector("main");
document.addEventListener("submit",(e)=>{
    e.preventDefault();
    let requestString = "https://wttr.in/" + textfield.value;
    fetch(requestString).then((response) => response.json()).then((data) => {
        console.log(data);
    })
});