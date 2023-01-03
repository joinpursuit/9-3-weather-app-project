const BASE_URL = 'http://wttr.in/';
const form = document.querySelector('form');
const searchField = document.querySelector('.searchField');
const main = document.querySelector('main');
const convertAside = document.querySelector('.convert');
const currentWeatherArticle = document.querySelector('.currentWeather');
const previousSearches = document.querySelector('.previousSearches');
const noPreviousSearches = document.querySelector('.noPreviousSearches');
const searchUlElement = document.querySelector('.searchUl');
const searchArray = [];
let tempSection = document.querySelector('.tempSection');
let chanceOfSunshine;
let chanceOfRain;
let chanceOfSnow;
let currentApi;

form.addEventListener('submit', generateUrl);

function generateUrl(event) {
    
}