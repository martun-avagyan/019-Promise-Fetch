"use strict";

// Using V2 version of the online API because it is much more simpler

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// Function to render the country

const renderCountry = function (data, className = "") {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__dta">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} mln people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

// Function that gets the country and it's neighbor

const getCountryAndNeighbor = function (country) {
  // Ajax call 1

  const request = new XMLHttpRequest();
  request.open("get", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    // Render country 1

    renderCountry(data);
    // Getting the neighbor country

    const [neighbor] = data.borders;
    if (!neighbor) return;

    // Ajax call 2

    const request2 = new XMLHttpRequest();
    request2.open("get", `https://restcountries.com/v2/alpha/${neighbor} `);
    request2.send();

    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, "neighbor");
    });
  });
};

getCountryAndNeighbor("belgium");
