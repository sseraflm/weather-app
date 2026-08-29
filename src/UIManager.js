export class UIManager {

    #cityNameInput;
    #submitButton;
    #resultContainer;
    #historyContainer;
    #quickSearchContainer;
    #addToQuickSearchButton;

    constructor() {
    this.#cityNameInput = document.getElementById("cityName");
    this.#submitButton = document.getElementById("submitCity");
    this.#resultContainer = document.getElementById("result");
    this.#historyContainer = document.getElementById("history");
    this.#quickSearchContainer = document.getElementById("quickSearch");
    this.#addToQuickSearchButton = document.getElementById("submitQuickSearch");
}

    // createWeatherElements
    renderWeatherCard(cityData, weatherData) {
        this.#resultContainer.innerText = "";
        this.clearInput()

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
    this.#resultContainer.append(weatherCard);
    }

    // createError
    renderError(message) {
        this.#resultContainer.innerText = "";
        const errorH2 = document.createElement("h2");
        errorH2.innerText = message;
        errorH2.classList.add("error");
        this.#resultContainer.append(errorH2);
    }

    // createHistoryElements
    renderHistory(searches) {
        this.#historyContainer.innerText = "";

    for (const search of searches) {
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
        this.#historyContainer.append(historyItem);
    }
}

    // createQuickSearchElement
    renderQuickSearch(cities) {
        this.#quickSearchContainer.innerText = ""
        cities.forEach(city => {
        const quickSearchDiv = document.createElement("div");
        quickSearchDiv.classList.add("quick-search-div");

        const quickSearchCity = document.createElement("p");
        quickSearchCity.innerText = city;
        quickSearchCity.classList.add("quick-search-city");

        const quickSearchDeleteButton = document.createElement("button");
        quickSearchDeleteButton.innerText = "Delete city.";
        quickSearchDeleteButton.classList.add("quick-search-delete");

        quickSearchDiv.append(quickSearchCity, quickSearchDeleteButton);
        this.#quickSearchContainer.append(quickSearchDiv);
    });
}

    // UX blocking button during fetch
    setLoadingState(isLoading) {
        if (isLoading) {
            this.#submitButton.disabled = true;
            this.#submitButton.innerText = "Fetching the data.."
            this.#submitButton.classList.add("Locked-btn")
        } else{
            this.#submitButton.disabled = false;
            this.#submitButton.classList.remove("Locked-btn")
            this.#submitButton.innerText = "Get the data."
        }
    }

    clearInput() {
        this.#cityNameInput.value = "";

    }

    getCityInputValue() {
        const city = this.#cityNameInput.value.trim();
        return city;
    }
    onSubmitClick(callback) {
    this.#submitButton.addEventListener("click", callback);
    }
    onQuickSearchClick(callback) {
    this.#addToQuickSearchButton.addEventListener("click", callback);
    }
    onQuickSearchContainerClick(callback) {
    this.#quickSearchContainer.addEventListener("click", callback);
    }
    setInputValue(city) {
        this.#cityNameInput.value = city
    }
    onHistoryClick(callback) {
    this.#historyContainer.addEventListener("click", callback);
    }
}

