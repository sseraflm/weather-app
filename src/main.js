import { WeatherService } from "./WeatherService.js";
import { UIManager } from "./UIManager.js";
import { StorageManager } from "./StorageManager.js";
import "./scss/main.scss";

const weatherService = new WeatherService();
const uiManager = new UIManager();
const storageManager = new StorageManager();

async function handleFetchWeather() {
  const cityName = uiManager.getCityInputValue();
  if (cityName === "") {
    uiManager.renderError("The input is empty.");
    return;
  }
  uiManager.setLoadingState(true);
  try {
    const { cityData, weatherData } =
      await weatherService.getWeatherForCity(cityName);
    uiManager.renderWeatherCard(cityData, weatherData);
    const historyObject = {
      city: cityData.results[0].name,
      time: weatherData.current.time,
      temperature: weatherData.current.temperature_2m,
    };
    const savedData = storageManager.loadHistory();
    savedData.unshift(historyObject);
    if (savedData.length > 5) {
      savedData.pop();
    }

    storageManager.saveHistory(savedData);
    uiManager.renderHistory(savedData);
  } catch (error) {
    uiManager.renderError(error.message);
  } finally {
    uiManager.setLoadingState(false);
  }
}

uiManager.onSubmitClick(handleFetchWeather);

const savedHistory = storageManager.loadHistory();
uiManager.renderHistory(savedHistory);

function handleAddToQuickSearch() {
  const cityName = uiManager.getCityInputValue();
  if (cityName === "") {
    return;
  }
  const savedQuickSearch = storageManager.loadQuickSearch();
  if (savedQuickSearch.some((city) => city === cityName)) {
    return;
  }
  savedQuickSearch.push(cityName);
  storageManager.saveQuickSearch(savedQuickSearch);
  uiManager.clearInput();
  uiManager.renderQuickSearch(savedQuickSearch);
}

uiManager.onQuickSearchClick(handleAddToQuickSearch);

function quickSearchHandler(event) {
  if (event.target.classList.contains("quick-search-city")) {
    const cityP = event.target.innerText;
    uiManager.setInputValue(cityP);
    handleFetchWeather();
  } else if (event.target.classList.contains("quick-search-delete")) {
    const cityP = event.target.previousElementSibling.innerText;
    const quickSearchData = storageManager.loadQuickSearch();
    if (quickSearchData.some((city) => city === cityP)) {
      const quickSearch = quickSearchData.filter((city) => city !== cityP);
      storageManager.saveQuickSearch(quickSearch);
      uiManager.renderQuickSearch(quickSearch);
    }
  }
}

const savedQuickSearch = storageManager.loadQuickSearch();
uiManager.renderQuickSearch(savedQuickSearch);

uiManager.onQuickSearchContainerClick(quickSearchHandler);

function handleHistoryClick(event) {
  const historyItem = event.target.closest(".history-item");
  if (!historyItem) {
    return;
  }
  const cityName = historyItem.dataset.city;
  uiManager.setInputValue(cityName);
  handleFetchWeather();
}

uiManager.onHistoryClick(handleHistoryClick);
