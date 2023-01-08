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

<!-- code block -->

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
