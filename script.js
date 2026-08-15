"use strict";

let cityNameInput = document.getElementById("cityName");
let submitButton = document.getElementById("submitCity");
let resultContainer = document.getElementById("result");

async function fetchWeatherData() {
    try {
        let city = cityNameInput.value;
        let response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
        );

        if (!response.ok) {
            createError("Failed to fetch city data.");
        } else {
            let cityData = await response.json();
            if (!cityData.results) {
                createError("Failed to get the city.");
            } else {
                let latitude = cityData.results[0].latitude;
                let longitude = cityData.results[0].longitude;

                let weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
                );
                if (!weatherResponse.ok) {
                    createError("Failed to fetch weather data.");
                } else {
                    let weatherData = await weatherResponse.json();
                    createWeatherElements(cityData, weatherData);
                }
            }
        }
    } catch (error) {
        createError("Something went wrong.");
    }
}

function createWeatherElements(cityData, weatherData) {
    resultContainer.innerText = "";
    cityNameInput.value = "";

    let weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    let cityName = document.createElement("h1");
    let name = cityData.results[0].name;
    cityName.innerText = name;
    cityName.classList.add("city-name");

    let cityCountry = document.createElement("p");
    let country = cityData.results[0].country;
    cityCountry.innerText = `Country the city is in: ${country}`;
    cityCountry.classList.add("city-country");

    let cityRegion = document.createElement("p");
    let region = cityData.results[0].admin1;
    cityRegion.innerText = `The region city is in: ${region}`;
    cityRegion.classList.add("city-region");

    let cityElevation = document.createElement("p");
    let elevation = cityData.results[0].elevation;
    cityElevation.innerText = `City elevation: ${elevation}m`;
    cityElevation.classList.add("city-elevation");

    let population = cityData.results[0].population;
    let cityPopulation = document.createElement("p");
    cityPopulation.classList.add("city-population");

    if (population === undefined) {
        cityPopulation.innerText = `No city population data.`;
    } else {
        cityPopulation.innerText = `City population: ${population}`;
    }

    let cityTemperature = document.createElement("p");
    let temperature = weatherData.current.temperature_2m;
    cityTemperature.innerText = `Current temperature in the city: ${temperature}°C`;
    cityTemperature.classList.add("city-temp");

    weatherCard.append(cityName, cityCountry, cityRegion, cityElevation, cityPopulation, cityTemperature);
    resultContainer.append(weatherCard);
}
function createError(textToShow) {
    resultContainer.innerText = "";
    let errorH2 = document.createElement("h2");
    errorH2.innerText = textToShow;
    errorH2.classList.add("error");
    resultContainer.append(errorH2);
}

submitButton.addEventListener("click", fetchWeatherData);
