class WeatherService {
    constructor() {}

    async getCityCoordinates(cityName) {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`,
        );

        if (!response.ok) {
            throw new Error("Failed to fetch city data.")
        }
        const cityData = await response.json();
         if (!cityData.results) {
            throw new Error("Failed to find the city.");
        }
        return cityData;
    }

    async getCurrentWeather(latitude, longitude) {
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
        );
        if (!weatherResponse.ok) {
            throw new Error("Failed to fetch the weather data.")
        }
        const weatherData = await weatherResponse.json();
        return weatherData;
    }
    async getWeatherForCity(cityName) {
        const cityData = await this.getCityCoordinates(cityName)
        const weatherData = await this.getCurrentWeather(
            cityData.results[0].latitude, 
            cityData.results[0].longitude
        );
        return {cityData, weatherData};
    }
}


class UIManager {
    constructor() {
    this.cityNameInput = document.getElementById("cityName");
    this.submitButton = document.getElementById("submitCity");
    this.resultContainer = document.getElementById("result");
    this.historyContainer = document.getElementById("history");
    this.quickSearchContainer = document.getElementById("quickSearch");
    }

    // createWeatherElements
    renderWeatherCard(cityData, weatherData) {}

    // createError
    renderError(message) {}

    // createHistoryElements
    renderHistory(searches) {}

    // createQuickSearchElement
    renderQuickSearch(cities) {}

    // UX blocking button during fetch
    setLoadingState(isLoading) {}

    clearInput() {}

    getCityInputValue() {}
}

class StorageManager {
    constructor() {
        this.historyKey = "History"
        this.quickSearchKey = "quickSearch"
    }

    // fetchWeatherData
    saveHistory(searches) {}

    loadHistory() {}

    // addToQuickSearch
    saveQuickSearch(cities) {}

    loadQuickSearch() {}
}