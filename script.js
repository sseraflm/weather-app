"use strict";

const cityNameInput = document.getElementById("cityName");
const submitButton = document.getElementById("submitCity");
const resultContainer = document.getElementById("result");
const historyContainer = document.getElementById("history");
let dataHistory = {
    searches: [],
};

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

        const historyObject = {
            city: cityData.results[0].name,
            time: weatherData.current.time,
            temperature: weatherData.current.temperature_2m,
        };
        dataHistory.searches.unshift(historyObject);
        if (dataHistory.searches.length > 5) {
            dataHistory.searches.pop();
        }
        const JSONDataHistory = JSON.stringify(dataHistory);
        localStorage.setItem("History", JSONDataHistory);
        createHistoryElements();
    } catch {
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

// Search history

function loadHistory() {
    const JSONDataHistory = localStorage.getItem("History");
    if (JSONDataHistory === null) {
        return;
    }
    const parsedDataHistory = JSON.parse(JSONDataHistory);
    dataHistory = parsedDataHistory;

    createHistoryElements();
}

function createHistoryElements() {
    historyContainer.innerText = "";

    for (const search of dataHistory.searches) {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");
        historyItem.dataset.city = search.city;

        const historyCityName = document.createElement("h1");
        historyCityName.innerText = search.city;
        historyCityName.classList.add("history-City");

        const dataTime = document.createElement("p");
        dataTime.innerText = `Data time: ${search.time}`;
        dataTime.classList.add("history-date");

        const cityTemperature = document.createElement("p");
        cityTemperature.innerText = `Temperature during the date: ${search.temperature}`;
        cityTemperature.classList.add("history-temp");

        historyItem.append(historyCityName, dataTime, cityTemperature);
        historyContainer.append(historyItem);
    }
}

loadHistory();

function handleHistoryClick(event) {
    const historyItem = event.target.closest(".history-item");
    if (!historyItem) {
        return;
    }
    const cityName = historyItem.dataset.city;
    cityNameInput.value = cityName;
    fetchWeatherData();
}

historyContainer.addEventListener("click", handleHistoryClick);

// Quick search
const quickSearchContainer = document.getElementById("quickSearch");
const addToQuickSearchButton = document.getElementById("submitQuickSearch");
let quickSearch = [];

function addToQuickSearch() {
    if (cityNameInput.value.trim() === "") {
        return;
    }
    const cityName = cityNameInput.value.trim();
    if (quickSearch.some(city => city === cityName)) {
        return;
    }
    quickSearch.push(cityName);
    const jsonQuickSearch = JSON.stringify(quickSearch);
    localStorage.setItem("quickSearch", jsonQuickSearch);
    cityNameInput.value = "";
    loadQuickSearch();
}

addToQuickSearchButton.addEventListener("click", addToQuickSearch);

function createQuickSearchElement() {
    quickSearch.forEach(city => {
        const quickSearchDiv = document.createElement("div");
        quickSearchDiv.classList.add("quick-search-div");

        const quickSearchCity = document.createElement("p");
        quickSearchCity.innerText = city;
        quickSearchCity.classList.add("quick-search-city");
        quickSearchCity.addEventListener("click", quickSearchCityData);

        const quickSearchDeleteButton = document.createElement("button");
        quickSearchDeleteButton.innerText = "Delete city.";
        quickSearchDeleteButton.classList.add("quick-search-delete");
        quickSearchDeleteButton.addEventListener("click", removeFromQuickSearch);

        quickSearchDiv.append(quickSearchCity, quickSearchDeleteButton);
        quickSearchContainer.append(quickSearchDiv);
    });
}

function removeFromQuickSearch(event) {
    const foundDiv = event.target.closest(".quick-search-div");
    const cityP = foundDiv.querySelector(".quick-search-city").innerText;
    if (quickSearch.some(city => city === cityP)) {
        quickSearch = quickSearch.filter(city => city !== cityP);
        const jsonQuickSearch = JSON.stringify(quickSearch);
        localStorage.setItem("quickSearch", jsonQuickSearch);
        loadQuickSearch();
    }
}

function loadQuickSearch() {
    const jsonQuickSearch = localStorage.getItem("quickSearch");
    quickSearchContainer.innerText = "";
    if (jsonQuickSearch === null) {
        return;
    }
    const quickSearchData = JSON.parse(jsonQuickSearch);
    quickSearch = quickSearchData;
    createQuickSearchElement();
}
loadQuickSearch();

function quickSearchCityData(event) {
    const foundDiv = event.target.closest(".quick-search-div");
    const cityP = foundDiv.querySelector(".quick-search-city").innerText;
    cityNameInput.value = cityP;
    fetchWeatherData();
}
