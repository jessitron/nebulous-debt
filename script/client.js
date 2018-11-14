// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o g');

const request = require('request');


// our default array of dreams
const dreams = [
  'Find and count some sheep',
  'Climb a really tall mountain',
  'Wash the dishes'
];

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];
const fileInput = dreamsForm.elements['file-content'];

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

const whereAmI = "https://nebulous-debt.glitch.me"

// iterate through every dream and add it to our page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();
  
  const fileContent = fileInput.value
  
  // how the F do you give a relative URL? I don't care. whatever.
  request.post(whereAmI + '/parse/', { fileContent: fileContent, pxe: dreamInput.value} , (err, request, body) => {
  
     console.log("An error:"); console.log(err); console.log(body);
  } )

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};
