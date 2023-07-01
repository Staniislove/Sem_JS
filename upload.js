document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
   
    let city = document.getElementById("cityInput").value;
    getCurrentWeather(city);
    getForecast(city);
   });
   
   function getCurrentWeather(city) {
    // Здесь нужно использовать OpenWeather API для получения данных о погоде на данный момент
    // Пример запроса к API (здесь используется fetch API)
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
   
    let weatherElement = document.createElement("div");
    weatherElement.innerHTML = `
           <h2>Погода сейчас</h2>
           <p>${month}/${day}, ${time}</p>
           <h3>${cityName}</h3>
           <h1>${temperature}°C</h1>
           <p>${description}</p>`;
   
    currentWeatherData.appendChild(weatherElement);
   }
   
   function getForecast(city) {
    // Здесь нужно использовать OpenWeather API для получения прогноза погоды на 8 дней
    // Пример запроса к API (здесь используется fetch API)
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
       forecastData.innerHTML = ``; 
     
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
         forecastElement.innerHTML = `<p>${month}/${day} ${time} ${temperature}°C ${description}</p>`; 
     
         forecastElement.onclick = function() {
           getDetailedForecast(forecastElement);
         };
     
         forecastData.appendChild(forecastElement); 
       } 
     }
     
     function getDetailedForecast(element) {
       let details = element.nextElementSibling;

       if (details && details.classList.contains("details")) {
         details.remove();
       } 
       else {
         details = document.createElement("div");
         details.classList.add("details");
         details.innerHTML = "Детальная информация";
     
         element.insertAdjacentElement("afterend", details);
       }
     }