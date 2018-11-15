"use strict";
// client-side js
// run by the browser each time your view template is loaded
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('hello world :o g');
const axios_1 = __importDefault(require("axios"));
// our default array of dreams
const dreams = [
    'Find and count some sheep',
    'Climb a really tall mountain',
    'Wash the laundry'
];
// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];
const fileInput = dreamsForm.elements['file-content'];
// a helper function that creates a list item for a given dream
const appendNewDream = function (dream) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = dream;
    dreamsList.appendChild(newListItem);
};
const whereAmI = "http://localhost:53661";
// iterate through every dream and add it to our page
dreams.forEach(function (dream) {
    appendNewDream(dream);
});
// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function (event) {
    // stop our form submission from refreshing the page
    event.preventDefault();
    const fileContent = fileInput.value;
    // how the F do you give a relative URL? I don't care. whatever.
    axios_1.default.post(whereAmI + '/parse/', { fileContent: fileContent, pxe: dreamInput.value }, {
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        console.log(res.data);
    });
    // get dream value and add it to the list
    dreams.push(dreamInput.value);
    appendNewDream(dreamInput.value);
    // reset form 
    dreamInput.value = '';
    dreamInput.focus();
};
