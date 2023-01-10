//Creating Variables to Manipulate DOM
const form = document.querySelector("#mainSearch");
const format = "?format=j1";
const base_url = "https://wttr.in/";

const h2 = document.createElement("h2");
const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("p");
const p4 = document.createElement("p");



// Error Case Handling
form.addEventListener("submit", (event) => {

    event.preventDefault();


