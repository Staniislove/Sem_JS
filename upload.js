document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
   
    let city = document.getElementById("cityInput").value;
    getCurrentWeather(city);
    getForecast(city);
   });
   
   function getCurrentWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=036950c45dcd417d392bcf0ebbbbe1cc`)
     .then(response => response.json())
     .then(data => {
      displayCurrentWeather(data);
     })
     .catch(error => {
      console.log(error);
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
     })
     .catch(error => {
      console.log(error);
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
                     <p>Humidity: ${humidity}%</p>
         `;
     
         element.insertAdjacentElement("afterend", details);
       }
     }