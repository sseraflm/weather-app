class WeatherService {
    constructor() {}

    async getCityCoordinates(cityName) {}

    async getCurrentWeather(latitude, longitude) {}
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