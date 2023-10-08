class WeatherData {
    constructor(city) {
      this.fetchWeather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=036950c45dcd417d392bcf0ebbbbe1cc`)
        .then(response => response.json());
    }
  }
  
  class ForecastData {
    constructor(city) {
      this.fetchForecast = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=036950c45dcd417d392bcf0ebbbbe1cc`)
        .then(response => response.json());
    }
  }
  
  export { WeatherData, ForecastData };