# weather-app

### About

A simple weather application built with JavaScript.

### Features

-Search for a city

- Display city name, country and region

- Display city elevation

- Display population when available

- Display current temperature

- Handle cities that cannot be found

- Handle API and network errors

- Dynamic generation of weather cards

### How does it work?

Firstly the user enters a city name.

Then the application sends the city name to the Open-Meteo Geocoding API.

The API then returns information about the city which includes its latitude and longitude.

latitude and longitude are then used to make a second request to the Open-Meteo Forecast API.

The application then retrieves the current temperature from the API.

Then the city and weather data are dynamically displayed on the page, errors are also handled if the API request fails or the city cannot be found.

### Technologies

- HTML

- CSS

- JavaScript

- Open-Meteo Geocoding API

- Open-Meteo Forecast API

### Plans for the future

- Improve input validation

- Improve the UI

- Add more detailed weather information
