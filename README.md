# weather-app

### About

A simple weather application built with JavaScript.

Github pages link: https://sseraflm.github.io/weather-app/

<img width="1732" height="915" alt="weatherApp" src="https://github.com/user-attachments/assets/a213487d-7543-4398-bb51-3a4c05b74067" />

### Features

- Search for a city

- Display city name, country and region

- Display city elevation

- Display population when available

- Display current temperature

- Handle cities that cannot be found

- Handle API and network errors

- Dynamic generation of weather cards

- Save searched cities to LocalStorage

- Display search history

- Store up to 5 recent searches

- Click a city from the search history to search for it again

- Save city names into quick search menu

- Click city names in quick search menu to quickly search for them

### How does it work?

Firstly the user enters a city name.

Then the application sends the city name to the Open-Meteo Geocoding API.

The API then returns information about the city which includes its latitude and longitude.

latitude and longitude are then used to make a second request to the Open-Meteo Forecast API.

The application then retrieves the current temperature from the API.

Then the city and weather data are dynamically displayed on the page, errors are also handled if the API request fails or the city cannot be found.

After a successful search, the application creates a history object containing the city name, the data time and temperature during that time, the object is added to the search history and the history is limited to the 5 most recent searches.

The search history is converted to JSON and saved to LocalStorage.

When the application starts, the saved history is loaded from LocalStorage and dynamically displayed on the page.

Each history item has the ability to be clicked to quickly search for a city again.

You can also save city name's to the quick search menu and click on them to quickly search for that city.

### Architecture

The application is organized into three classes each responsible for a single concern.

- `WeatherService` handles communication with the Open-Meteo APIs

- `UIManager` handles all DOM manipulation and rendering

- `StorageManager` handles reading from and writing to LocalStorage

These three classes are imported and coordinated together in `src/main.js`.

### Styles

Styles are written in SCSS and organized into partials `src/scss/`.

- `_variables.scss` holds shared colors and other reusable values.

- `_mixins.scss` holds reusable style patterns.

- `_layout.scss` holds the page's overall structure.

- `_components.scss` handle individual UI elements.

All of the partials are combined in `src/scss/main.scss` which then gets imported into `src/main.js`

### Technologies

- HTML

- SCSS

- JavaScript

- Vite

- Open-Meteo Geocoding API

- Open-Meteo Forecast API

### Running locally

1. Clone the repository

2. Install dependencies:

`npm install`

3. Start the dev server:

`npm run dev`

4. Open the URL shown in the terminal.

### Plans for the future

- Improve the UI
- Add more detailed weather information
