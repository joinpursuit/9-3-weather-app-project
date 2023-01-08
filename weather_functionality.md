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

It's hard for me to explain the next part. But the reason I write everything into it's separate function is because of the Single Responsibility Principle. This principle states that a function should only do one thing. And that one thing should be done well. This is a very important principle to follow. It makes your code easier to read and understand. It also makes your code easier to debug. And it makes your code easier to maintain.

Who said that a function should do one thing and one thing only? what book did it come from?
this came from the book ["Clean Code" by Robert C. Martin](https://thixalongmy.haugiang.gov.vn/media/1175/clean_code.pdf). I highly recommend this book to anyone who wants to become a better developer.

````js

```js
````

```

```
