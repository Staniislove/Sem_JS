import { WeatherData, ForecastData } from './data.mjs';

class weatherJson {
  constructor() {
    this.date = new Date();
    this.month = '';
    this.day = '';
    this.time = '';
    this.cityName = '';
    this.temperature = 0;
    this.description = '';
    this.feelsLike = 0;
    this.wind = 0;
    this.humidity = '';
    this.country = '';
  }

  async fetchData(city) {
    const weatherData = new WeatherData(city);
    const jsonData = await weatherData.fetchWeather;

    this.date = new Date(jsonData.dt * 1000);
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.time = this.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    this.cityName = jsonData.name;
    this.temperature = Math.round(jsonData.main.temp - 273.15);
    this.description = jsonData.weather[0].description;
    this.feelsLike = Math.round(jsonData.main.feels_like - 273.15);
    this.wind = jsonData.wind.speed;
    this.humidity = jsonData.main.humidity;
    this.country = jsonData.sys.country;
  }
}


class forecastJson {
  constructor() {
    this.json = '';
  }

  async fetchData(city) {
    const forecastData = new ForecastData(city);

    // Получаем данные из JSON и присваиваем их свойствам класса Data
    this.json = await forecastData.fetchForecast;
  }
}

export { weatherJson, forecastJson };