import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector("#search-box");
const listRef = document.querySelector(".country-list");
const infoRef = document.querySelector(".country-info");

inputRef.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
    const textInput = evt.target.value.trim();
    if (!textInput) {
        listRef.innerHTML = "";
        infoRef.innerHTML = "";
        return; 
    }
    fetchCountries(textInput)
        .then(renderMarkup)
        .catch(() =>
            Notiflix.Notify.failure("Oops, there is no country with that name"));
}


function renderMarkup(data) {
    if (data.length > 10) {
        Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
        return;
  }
   else if (data.length >= 2 && data.length < 10) {
        infoRef.innerHTML = "";
        listRef.innerHTML = data
            .map(element => `<li><img src=${element.flags.svg} width = 40px, height = 25px></img><span>${element.name.official}</span></li>`)
  .join("");
  return;
  }
  
  listRef.innerHTML = "";
    const country = data[0];
  infoRef.innerHTML = `<div class = 'wrapper'><img src=${country.flags.svg} width = 40px, height = 25px></img><span class = 'name'>${country.name.official}</span></div>
  <p>Capital: <span class = 'capital'>${country.capital}</span></p>
  <p>Population: <span class = 'population'>${country.population}</span></p>
  <p>Languages: <span class = 'languages'>${Object.values(country.languages)}</span></p>`;
}

