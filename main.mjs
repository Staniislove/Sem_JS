import { weatherJson, forecastJson } from './jsonDecoder.mjs';


const continueBtn = document.getElementById("continueBtn");
const exitBtn = document.getElementById("exitBtn");

continueBtn.addEventListener("click", function(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;

  login(username);
});

exitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  logout(username);
});

document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let city = document.getElementById("cityInput").value;

  displayCurrentWeather(city);
  displayForecast(city);
  displayHourly(city);
});

async function displayCurrentWeather(city) {
  let currentWeatherData = document.getElementById("currentWeatherData");
  currentWeatherData.innerHTML = "";

  const weatherjson = new weatherJson();
  try {
    await weatherjson.fetchData(city);

    let weatherElement = document.createElement("div");
    weatherElement.innerHTML = `
      <h2>${weatherjson.month}/${weatherjson.day}, ${weatherjson.time}</h2>
      <h3>${weatherjson.cityName}, ${weatherjson.country}</h3>
      <h1>${weatherjson.temperature}°C</h1>
      <h4>Feels like ${weatherjson.feelsLike}°C. ${weatherjson.description}</h4>
      <p>Wind: ${weatherjson.wind}m/s</p>
      <p>Humidity: ${weatherjson.humidity}%</p>`;
    
    currentWeatherData.appendChild(weatherElement);
  } catch (error) {
    console.error('Произошла ошибка при получении данных о погоде:', error);
  }
}
   
async function displayForecast(city) {
  let forecastData = document.getElementById("forecastData");
  forecastData.innerHTML = "<h5>5-day forecast</h5>";

  const forecastjson = new forecastJson();

  forecastjson.fetchData(city)
    .then(() => {
      for (let i = 0; i < 40; i++) {
        let forecast = forecastjson.json.list[i];
        let date = new Date(forecast.dt * 1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (time != '13:00') continue;
        let temperature = Math.round(forecast.main.temp - 273.15);
        let description = forecast.weather[0].description;

        let forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-day");
        forecastElement.innerHTML = `<p>${month}/${day} ${temperature}°C ${description} <span class="arrow-down">▼</span></p>`;

        forecastElement.onclick = function() {
          getDetailedForecast(forecast, forecastElement);
        };

        forecastData.appendChild(forecastElement);
      }
    })
}
  
  async function displayHourly(city){
    let hourlyData = document.getElementById("hourlyData"); 
    hourlyData.innerHTML = ``; 

    const forecastjson = new forecastJson();
    await forecastjson.fetchData(city)
    .then(() => {
      for (let i = 0; i < 8; i++) { 
        let forecast = forecastjson.json.list[i]; 
        let date = new Date(forecast.dt * 1000); 
        let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
        let temperature = Math.round(forecast.main.temp - 273.15); 
        let description = forecast.weather[0].description;
        let wind = forecast.wind.speed;
     
        let hourlyElement = document.createElement("div");
        hourlyElement.classList.add("hourlyElement"); 
        hourlyElement.innerHTML = `
                <h2>${time} </h2>
                <h4>${temperature}°C</h4>
                <p>${description}</p>
                <p>Wind: ${wind}m/s</p>`; 
     
        hourlyData.appendChild(hourlyElement); 
      } 
    })  
  }

  function getDetailedForecast(forecast, element) {
    let details = element.nextElementSibling;
  
    if (details && details.classList.contains("details")) {
      details.remove();
      element.querySelector(".arrow-down").textContent = "▼"; 
    } else {
      details = document.createElement("div");
      details.classList.add("details");
      let feelsLike = Math.round(forecast.main.feels_like - 273.15);
      let wind = forecast.wind.speed;
      let humidity = forecast.main.humidity;
      details.innerHTML = `
        <p>Feels like: ${feelsLike}°C</p>
        <p>Wind: ${wind}m/s</p>
        <p>Humidity: ${humidity}%</p>`;
  
      element.insertAdjacentElement("afterend", details);
      element.querySelector(".arrow-down").textContent = "▲";
    }
  }

  function login(username){    
    if (username != "") {
      let helloData = document.getElementById("helloData");
      helloData.innerHTML = "";

      document.getElementById("login-page").style.display = "none";
      document.getElementById("main-page").style.display = "block";
        
      let helloElement = document.createElement("div");
      helloElement.innerHTML = `<p>Hello, ${username} !<p>`;
      helloData.appendChild(helloElement);
    }
  }
    
  function logout(username){
    username.value = "";
    document.getElementById("login-page").style.display = "block";
    document.getElementById("main-page").style.display = "none";
  }