document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();
   
  let city = document.getElementById("cityInput").value;
  getCurrentWeather(city);
  getForecast(city);
  getHourly(city);
  });
   
  function getCurrentWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=036950c45dcd417d392bcf0ebbbbe1cc`)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
    });
  }
   
  function displayCurrentWeather(data) {
    let currentWeatherData = document.getElementById("currentWeatherData");
    currentWeatherData.innerHTML = "";
   
    let date = new Date(data.dt * 1000);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
   
    let cityName = data.name;
    let temperature = Math.round(data.main.temp - 273.15);
    let description = data.weather[0].description;
    let feelsLike = Math.round(data.main.feels_like - 273.15);
    let wind = data.wind.speed;
    let humidity = data.main.humidity;
    let country = data.sys.country;
   
    let weatherElement = document.createElement("div");
    weatherElement.innerHTML = `
            <h2>${month}/${day}, ${time}</h2>
            <h3>${cityName}, ${country}</h3>
            <h1>${temperature}°C</h1>
            <h4>Feels like ${feelsLike}°C. ${description}</h4>
            <p>Wind: ${wind}m/s</p>
            <p>Humidity: ${humidity}%</p>`;
   
    currentWeatherData.appendChild(weatherElement);
  }
   
  function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=036950c45dcd417d392bcf0ebbbbe1cc`)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    });
  }
   
  function displayForecast(data) { 
    let forecastData = document.getElementById("forecastData"); 
    forecastData.innerHTML = `<h3>5-day forecast</h3>`; 
     
    for (i = 0; i < 40; i++) { 
      let forecast = data.list[i]; 
      let date = new Date(forecast.dt * 1000); 
      let month = date.getMonth() + 1; 
      let day = date.getDate(); 
      let time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

      if (time != '13:00') continue; 
      let temperature = Math.round(forecast.main.temp - 273.15); 
      let description = forecast.weather[0].description;
     
      let forecastElement = document.createElement("div"); 
      forecastElement.classList.add("forecast-day"); 
      forecastElement.innerHTML = `<p>${month}/${day} ${temperature}°C ${description}</p>`; 
     
      forecastElement.onclick = function() {
        getDetailedForecast(forecast, forecastElement);
      };
     
      forecastData.appendChild(forecastElement); 
    } 
  }
     
  function getDetailedForecast(forecast, element) {
    let details = element.nextElementSibling;

    if (details && details.classList.contains("details")) {
      details.remove();
    } 
    else {
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
    }
  }

  function getHourly(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=036950c45dcd417d392bcf0ebbbbe1cc`)
    .then(response => response.json())
    .then(data => {
      displayHourly(data);
    });
  }

  function displayHourly(data){
    let hourlyData = document.getElementById("hourlyData"); 
    hourlyData.innerHTML = ``; 
     
    for (i = 0; i < 8; i++) { 
      let forecast = data.list[i]; 
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
              <p>${wind}m/s</p>`; 
     
      hourlyData.appendChild(hourlyElement); 
    } 
  }


  function login(){
    var username = document.getElementById("username").value;    
    
    if (username !== "") {
      let helloData = document.getElementById("helloData");
      helloData.innerHTML = "";

      document.getElementById("login-page").style.display = "none";
      document.getElementById("main-page").style.display = "block";
        
      let helloElement = document.createElement("div");
      helloElement.innerHTML = `<p>Hello, ${username} !<p>`;
      helloData.appendChild(helloElement);
    }
  }
    
  function logout(){
    document.getElementById("username").value = "";
    document.getElementById("login-page").style.display = "block";
    document.getElementById("main-page").style.display = "none";
  }