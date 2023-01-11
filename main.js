// this code block is the variable for the api fetch and queySelector for certain elements in the html file

const BASE_URL = "https://wttr.in";


const form = document.querySelector("form");
const section = document.querySelector("section")
const textInput = document.querySelector("#userSearch")
const main = document.querySelector("main")


// this code block is the creation of the elements where the average temp , maxtemp and mintemp will be stored for the today, 
//tomorrow and day after tomorrow boxes on our page. Each artickle is given a class name and attribute in order to give us more flexibility 
//to manipulate the content inthese elements
const articleOneH2 = document.createElement("h2")
articleOneH2.setAttribute("class", "today")
articleOneH2.innerText = "Today"
const articleTwoH2 = document.createElement("h2")
articleTwoH2.setAttribute("class", "tomorrow")
articleTwoH2.innerText = "Tomorrow"
const articleThreeH2 = document.createElement("h2")
articleThreeH2.setAttribute("class", "dayAfterTomorrow")
articleThreeH2.innerText = "Day After Tomorrow"



// This code block represents a way for me to grab all the articles 
//in the html file and then append the content I want in those articles. 
const mainArticles = document.querySelectorAll("article")
mainArticles[1].prepend(articleOneH2)
mainArticles[2].prepend(articleTwoH2)
mainArticles[3].append(articleThreeH2)
mainArticles[1].prepend(articleOneH2)
mainArticles[2].prepend(articleTwoH2)



// This code block is the creation of the input and submit bitton on the dom. It also includes a preventDefault 
//make it possible that we can put in new text in the inpur box without having to erase it.
const inputCity = textInput.value;
const submitButton = document.querySelector("#submitSearch")
 submitButton.addEventListener("click", handleClick => {
    handleClick.preventDefault()
    // function getWeatherByCity() {
        //this code block is the fetch to tthe api and then resolving and structuring of the content from that api
        const BASE_URL = `https://wttr.in/${textInput.value}?format=j1`
        fetch(BASE_URL)
            .then((response) => response.json())
         .then((city) => {
          console.log(city)
       
          console.log(textInput.value, inputCity)

          //This code block is the creation of elekeents and result of the fetches to the api for certasin values and objects in order to display thme for the user.
          const chooseLocation = document.querySelector(".clear")
          chooseLocation.textContent = ""
            const area = city.nearest_area[0].areaName[0].value
            const h3UserValue = document.createElement("h3")
            h3UserValue.textContent = textInput.value
            console.log(textInput.value, inputCity)
            
            const searchArea = document.createElement("p")
            if (textInput.value.toLowerCase()== area.toLowerCase()) {
                searchArea.innerText = `Area: ${area}`
            }else {
            searchArea.innerText = `NearestArea: ${area}`
            }
            // h2.append(area)
            // const area = city.areaName
            //Creating elemts to hold the keyvalue pairs of area, region, country
            const region = city.nearest_area[0].region[0].value;
            // console.log(city.nearest_area[0].region[0].value)
            const p = document.createElement("p")
            p.innerText =  `Region: ${region}`

            const country = city.nearest_area[0].country[0].value;
            const pCountry = document.createElement("p")
            pCountry.innerText = `Country: ${country}`
            const feelsLike = city.current_condition[0].FeelsLikeF;
            const span = document.createElement("span");
            span.innerText = ` Currently: ${feelsLike}F`

            // This code block writtent ot produce icons, emojis for the dexription of the eesthoer, synny, rainy , snowy
            const sunny = city.weather[0].hourly[0].chanceofsun;
            const chanceOfSun = document.createElement("img")
            chanceOfSun.setAttribute("class", "sunshine")
            img.src = "https://www.shutterstock.com/image-photo/yellow-flowers-field-under-blue-cloudy-128559287"
            if (sunny > 50) {
            chanceOfSun.innerText =  img.src
            }

            const rainy = city.weather[0].hourly[0].chanceofrain;
            const chanceOfRains = document.createElement("img")
            chanceOfRains.setAttribute("class", "rains")
            img.src ="https://pngwing.com/en/free-png-blpoo"
            if (rainy > 50){
            chanceOfRains.innerText =  img.src
            }

            const snowy = city.weather[0].hourly[0].chanceofsnow;
            const chanceOfSnowing = document.createElement("img")

            chanceOfSnowing.setAttribute("class", "snowcd P0")
            img.src = "https://www.clipartmax.com/middle/m2H7H7b1A0H7d3K9_snowflake-icon-emoji-copo-de-nieve/"
            
            if (snowy > 50) {
            chanceOfSnowing.innerText = img.src
            }

            main.append(h3UserValue, searchArea, p, pCountry, span)
            
            //variables created and tot store the pertinent weather informstion required by cypress tests 

            const avgTempTodayF = city.weather[0].avgtempF;
            const maxTempTodayF = city.weather[0].maxtempF;
            const minTempTodayF = city.weather[0].mintempF;

            const todayAvg = document.createElement('p')
            todayAvg.setAttribute("class", "avg")
            todayAvg.innerText = avgTempTodayF;
            const todayMax = document.createElement("p")
            todayMax.setAttribute("class", "max")
            todayMax.innerText = maxTempTodayF;
            const todayMin = document.createElement("p")
            todayMin.setAttribute("class", "min")
            todayMin.innerText = minTempTodayF;


            const avgTempTomorrowF = city.weather[1].avgtempF;
            const maxTempTomorrowF = city.weather[1].maxtempF;
            const minTempTomorrowF = city.weather[1].mintempF;

            const tomorrowAvg = document.createElement('p')
            tomorrowAvg.setAttribute("class", "tomavg")
            tomorrowAvg.innerText = avgTempTomorrowF;
            const tomorrowMax = document.createElement("p")
            tomorrowMax.setAttribute("class", "tommax")
            tomorrowMax.innerText = maxTempTomorrowF;
            const tomorrowMin = document.createElement("p")
            tomorrowMin.setAttribute("class", "tommin")
            tomorrowMin.innerText = minTempTomorrowF;


            const dayAfterAvgTempF = city.weather[2].avgtempF;
            const dayAfterMaxF = city.weather[2].maxtempF;
            const dayAfterMinF = city.weather[2].mintempF;

            const dayAfterAvg = document.createElement('p')
            dayAfterAvg.setAttribute("class", "dayAfteravg")
            dayAfterAvg.innerText = dayAfterAvgTempF;
            const dayAfterMax = document.createElement("p")
            dayAfterMax.setAttribute("class", "dayAftermax")
            dayAfterMax.innerText = dayAfterMaxF;
            const dayAfterMin = document.createElement("p")
            dayAfterMin.setAttribute("class", "dayAftermin")
            dayAfterMin.innerText = dayAfterMinF;



       
            articleOneH2.append(todayAvg, todayMax, todayMin)
            articleTwoH2.append(tomorrowAvg, tomorrowMax, tomorrowMin)
            articleThreeH2.append(dayAfterAvg, dayAfterMax, dayAfterMin)
            console.log(articleOneH2)
           
            const queriesRemoved = document.querySelector(".noqueries")
            queriesRemoved.innerText = ""

            const linkedSearches = document.querySelector("ul")
            const listedLink = document.createElement("li")
            const aTag = document.createElement("a")

            aTag.setAttribute("href" , "#")
            aTag.innerText = `${textInput.value} -${feelsLike}°F`
        //some varuable appended at the end. 
            listedLink.append(aTag)
            linkedSearches.append(listedLink)

            


            


      

            textInput.value = ""
        })//the result
        .catch((error) => {
            console.log(error)
        // })// the error
        
        })
     
 
 
   
    
    
    // getWeatherByCity()
   
  
 
    // form.reset();
  
})



// function getWeatherByCity() {
    
//     fetch(`${BASE_URL}/${inputCity}?format=j1`)
//     .then((response)=> 
//         response.json())
//      .then((city) => {
//       console.log(city)
   
        
//       const chooseLocation = document.querySelector("#clear")
//       chooseLocation.remove()
//         const area = city.nearest_area[0].areaName[0].value
//         const h3 = document.createElement("h3")
//         h3.innerText = textInput.value
//         console.log("1" ,inputCity)
//         const searchArea = document.createElement("p")
//         searchArea.innerText = `Area: ${area}`
       
//         // h2.append(area)
//         // const area = city.areaName
//         const region = city.nearest_area[0].region[0].value;
//         // console.log(city.nearest_area[0].region[0].value)
//         const p =document.createElement("p")
//         p.innerText =  `Region: ${region}`
//         const countryValue = city.nearest_area[0].country[0].value;
//         countryValue.innerText = `Country: ${countryValue}`
//         const feelsLike = city.current_condition[0].FeelsLikeF;
//         const span = document.createElement("span");
//         span.innerText = ` Currently: Feels Like ${feelsLike}F`
//         main.append(h3, p, countryValue, span)
        
//         textInput.value = ""
//     })//the result
//     .catch((error) => {
//         console.log(error)
//     // })// the error
    
//     })
// }
// //    getWeatherByCity(city)