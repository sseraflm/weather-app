"use strict";

const cityNameInput = document.getElementById("cityName");
const submitButton = document.getElementById("submitCity");
const resultContainer = document.getElementById("result");

async function fetchWeatherData() {
    try {
        const city = cityNameInput.value.trim();
        if (city === "") {
            createError("The input is empty.");
            return;
        }
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
        );

        if (!response.ok) {
            createError("Failed to fetch city data.");
            return;
        }
        const cityData = await response.json();
        if (!cityData.results) {
            createError("Failed to get the city.");
            return;
        }
        const latitude = cityData.results[0].latitude;
        const longitude = cityData.results[0].longitude;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
        );
        if (!weatherResponse.ok) {
            createError("Failed to fetch weather data.");
            return;
        }
        const weatherData = await weatherResponse.json();
        createWeatherElements(cityData, weatherData);
    } catch (error) {
        createError("Something went wrong.");
        return;
    }
}

function createWeatherElements(cityData, weatherData) {
    resultContainer.innerText = "";
    cityNameInput.value = "";

    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    const cityName = document.createElement("h1");
    const name = cityData.results[0].name;
    cityName.innerText = name;
    cityName.classList.add("city-name");

    const cityCountry = document.createElement("p");
    const country = cityData.results[0].country;
    cityCountry.innerText = `Country the city is in: ${country}`;
    cityCountry.classList.add("city-country");

    const cityRegion = document.createElement("p");
    const region = cityData.results[0].admin1;
    cityRegion.innerText = `The region city is in: ${region}`;
    cityRegion.classList.add("city-region");

    const cityElevation = document.createElement("p");
    const elevation = cityData.results[0].elevation;
    cityElevation.innerText = `City elevation: ${elevation}m`;
    cityElevation.classList.add("city-elevation");

    const population = cityData.results[0].population;
    const cityPopulation = document.createElement("p");
    cityPopulation.classList.add("city-population");

    if (population === undefined) {
        cityPopulation.innerText = `No city population data.`;
    } else {
        cityPopulation.innerText = `City population: ${population}`;
    }

    const cityTemperature = document.createElement("p");
    const temperature = weatherData.current.temperature_2m;
    cityTemperature.innerText = `Current temperature in the city: ${temperature}°C`;
    cityTemperature.classList.add("city-temp");

    weatherCard.append(cityName, cityCountry, cityRegion, cityElevation, cityPopulation, cityTemperature);
    resultContainer.append(weatherCard);
}
function createError(textToShow) {
    resultContainer.innerText = "";
    const errorH2 = document.createElement("h2");
    errorH2.innerText = textToShow;
    errorH2.classList.add("error");
    resultContainer.append(errorH2);
}

submitButton.addEventListener("click", fetchWeatherData);
