There are many ways to complete/satisfy this weather app.
But I believe there is an efficient way to do it.
There should only be one call to the 'fetch' function that gets the weather data.
The data/response from the fetch should be destructured.
Therefore the destructured json object is much easier to work with.
At most there should only be three event listeners

1. The event listener for the 'submit' button from the weather form.
2. The event listener for the 'convert' button from the temp_convert form.
3. The event listener for the 'anchor' link from the previous_searches.

It would be helpful to have all logic that you would normally put inside the callback of the eventlistener in its own function like this:

```js
// extract the element from the DOM and store it in a variable
const weatherForm = document.querySelector("form");

// add an event listener to the element
weatherForm.addEventListener("submit", (event) => {
  // our logic would normally go here
});
```

The logic that you would normally put inside the callback of the eventlistener should be in its own function like this:

```js
// extract the element from the DOM and store it in a variable
const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", weatherFormSubmitEvent);

// then define the function
function weatherFormSubmitEvent(event) {
  // our logic could go here as well
}
```

The two code blocks presented above work in the same way. But now some issues that we can run into are scope issues. These can be fixed easily tho.

We must first understand that there are...maybe two or three parts to the URL that we will use to make the 'fetch' call.

1. The base URL
2. The userInput
3. The endpoint

These will look like this:

```js

const BASE_URL: "https://wttr.in/";
const userInput: "New York"; // however you get your input here is up to you
const ENDPOINT: "?format=j1";

```

It's hard for me to explain the next part. But the reason I write everything into it's separate function is because of the Single Responsibility Principle(SRP). This principle states that a function should only do one thing. And that one thing should be done well. This is a very important principle to follow. It makes your code easier to read and understand. It also makes your code easier to debug. And it makes your code easier to maintain.

Who said that a function should do one thing and one thing only? what book did it come from?
this came from the book ["Clean Code" by Robert C. Martin](https://thixalongmy.haugiang.gov.vn/media/1175/clean_code.pdf). I highly recommend this book to anyone who wants to become a better developer.

# Mis en place

I'm going to start this section by mentioning that I'm a very big fan of the show **"Top Chef"**. I've been watching it since its 5th season. The New York City Season!!!!

Mis en place is when you have all your ingredients and tools ready to go before you start cooking. This is a very important step in cooking. It makes the process of cooking much easier. It also makes the process of cooking much more enjoyable. I'm going to use this analogy to explain the next part.

## Extracting the elements from the DOM

Let's begin by extracting elements. This can be done in so many different ways.

```js
const weatherForm = document.querySelector("form");
```

This line of code above extracts the 'form' element from the DOM, it will work sort of like '.find()' Higher Order Function. Which we have learned about in previous lessons. Which will return the first element of the 'form' tag.

```js
const weatherForm = document.getElementById("weatherForm");
```

The 'getElementById' method will return the element with the id of 'weatherForm'. This method will only return one element. If there are multiple elements with the same id, it will only return the first one.

```js
const weatherForm = document.getElementsByClassName("weatherForm");
```

The 'getElementsByClassName' method will return an array of elements with the class of 'weatherForm'. This method will return all elements with the same class. If only one element has this class then it will return an array with one element.

---

## Deep Dive into the `querySelector()', 'querySelectorAll()', 'getElementById()', and 'getElementsByClassName()'` methods

### What is the difference of querySelector && getElementById || querySelectorAll && getElementByClassName?

The difference is that the 'querySelector' method will return the first element that matches the selector. The 'getElementById' method will return the element with the id of 'weatherForm'.

### Is there a difference in performance?

Yes, the 'querySelector' method is faster than the 'getElementById' method. The 'querySelector' method is faster because it only returns the first element that matches the selector. The 'getElementById' method will return the element with the id of 'weatherForm'. But the performance difference is very small.

### So why use one over the other?

The real reason I found out why to use 'querySelector' and 'querySelectorAll' over the others is that it is more flexible. You can use the 'querySelector' method to select elements by id, class, tag, and attribute. The 'getElementById' method will only return the element with the id of 'weatherForm'. The 'getElementsByClassName' method will return an array of elements with the class of 'weatherForm'. The 'querySelectorAll' method will return an array of elements that match the selector. Finally using these two methods set up a single standardized way of making element selections whether by type, id, class, etc.

## Let's Carry-On

Now that we've extracted the 'form' element from the DOM. We can add an event listener to it. While we at it let's do the same to the 'convert_temp' form.

```js
const weatherF = document.querySelector("weather_form");
weatherF.addEventListener("submit", handleWeatherFormSubmit);

const tempConvF = document.querySelector("temp_form");
tempConvF.addEventListener("submit", handleTempFormSubmit);
```

### Why does this event look different from the ones explained in class?

MDN says that the 'addEventListener' method takes two arguments. The first argument is the event type. The second argument is the callback function. The callback function is the function that will be called when the event is triggered. The callback function will be called with an event object. The event object will contain information about the event that was triggered. The event object will also contain information about the element that the event was triggered on.

### What is the event object?

The event object is an object that contains information about the event that was triggered. The event object will also contain information about the element that the event was triggered on. The event object is passed into the callback function as an argument. The event object will be the first argument that is passed into the callback function.

So what have we been doing lately? We've been adding an event listener to a DOM element via an annonymous function. This is not the best practice. We should be adding an event listener to a DOM element via a named function. This is the best practice. This is because it makes our code easier to read and understand. It also makes our code easier to debug. And again it makes our code easier to maintain. P.S. Clean Code

The code below shows and event listener being added to a DOM element via an annonymous function.

```js
const weatherF = document.querySelector("weather_form");
weatherF.addEventListener("submit", (event) => {
  // our logic would normally go here
});
```

The code below shows and event listener being added to a DOM element via a named function.

```js
const weatherF = document.querySelector("weather_form");
weatherF.addEventListener("submit", handleWeatherFormSubmit);
```

## Named Functions - Code Added

Inside this named functions will contain the logic that we want to execute when the event is triggered. We must ask ourselves what we want to do:

1. Prevent the default behavior of the event
2. Extract the value of the input
3. Construct the URL that we will use to make the API call
4. Make the API call

```js
function handleWeatherFormSubmit(event) {
  event.preventDefault();
  const user_input = weatherF.weather_submit;
  const BASE_URL = `https://wttr.in/${user_input.value}?format=j1`;

  // normally we make an API call here
  // but with the info we know now we can make a function
  // to handle that logic and pass in the BASE_URL as an argument
  fetchWeatherInformation(BASE_URL);
}
```

As mentioned before a function should only do one thing, or at most do closely related tasks. Allowing your function to do multiple things will result in a function that is harder to read, understand, debug and most importantly maintain.

Writing a function that do multiple things is not a bad thing. What is bad is when those things are not related to each other nor are they done well can result in Code Smell.

## What is Code Smell?

Code Smell is when you have a function that performs multiple unrelated tasks. Unfourtunatly this is bad practice. We must strive to learn the concept of breaking up functions into smaller pieces.

## Back to project

Now that we got that out of the way. We can move along and explain the logic that would go into the following function.

```js
fetchWeatherInformation(BASE_URL);
```

The function 'fetchWeatherInformation()' was called inside my 'handleWeatherFormSubmit()' function. I decided to move this logic outside. To keep things clean and organized.

```js
function fetchWeatherInformation(url) {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      handleWeatherAPIResponse(response);
    })
    .catch((error) => {});
}
```

## THE GOD FUNCTION

The God Function is a function that essentially does too much. It does way too many things at once. Sometimes these things may not be even related to the other.

## Assinging Responsibility To The handleWeatherAPIResponse(response) Function

```js
function handleWeatherAPIResponse(response) {}
```

Putting more than one parameter in a function is also bad practice. This is called a God Function. A God Function is a function that does too much. It is a function that does too many things. It is a function that does too many things at once. It is a function that does too many things at once and does them poorly. It is a function that does too many things at once and does them poorly and is hard to read, understand, debug and maintain.

https://medium.com/swlh/clean-code-writing-functions-or-methods-4e6e53ff4ac2

innertext vs innerHTML vs textContent
the difference between innerText and textContent is that innerText will return the text content of an element and all of its children. textContent will return the text content of an element and all of its children. innerHTML will return the HTML content of an element and all of its children.

textContent is a property of the Element interface. It represents the text content of an element and all of its descendants. It is a read-only property.
