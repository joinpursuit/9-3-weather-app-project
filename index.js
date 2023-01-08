// function dailyWeather() {
//    const paragraph = document.createElement("p");
//    const pTag = document.querySelector("p")

// }
const main = document.querySelector("main")
const article = document.querySelectorAll("article")
//  const aside = document.querySelector("aside")


// const divClassList = div.classList.add("today", "tomorrow", "dayAfterTomorrow")
// aside.prepend(div)

const articleOneH2 = document.createElement("h2")
articleOneH2.setAttribute("class", "today")
articleOneH2.innerText = "Today"
const articleTwoH2 = document.createElement("h2")
articleTwoH2.setAttribute("class", "tomorrow")
articleTwoH2.innerText = "Tomorrow"
const articleThreeH2 = document.createElement("h2")
articleThreeH2.setAttribute("class", "dayAfterTomorrow")
articleThreeH2.innerText = "Day After Tomorrow"
const mainArticles = document.querySelectorAll("article")
mainArticles[1].prepend(articleOneH2)
mainArticles[2].prepend(articleTwoH2)
mainArticles[3].append(articleThreeH2)

// function getCard(mainArticles) {
// for (let el of mainArticle) {
// const el = document.querySelector("article")

// }
// }



// const pTag = document.createElement("p")
// pTag.innerText = "Some text"
// divToday.append(pTag)

// const article = document.querySelector("article")
// main.append(divToday)

// const divTomorrow = document.CreateElement("div", ".tomorrow")
// aside.append(divTomorrow)

// const divDayAfterTomorrow = document.createElement("div.dayaftertomorrow")
// asside.append(divDayAfterTomorrow)