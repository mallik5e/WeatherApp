const apiKey = "46beeab8947881ca4074703e1d847e5c";

const weatherDataE1 = document.getElementById("weather-data");

const cityInputE1 = document.getElementById("city-input");

const formE1 = document.querySelector("form")

formE1.addEventListener("submit", (event) => {
      event.preventDefault();
      const cityValue = cityInputE1.value;
      getWeatherData(cityValue);

});

async function getWeatherData(cityValue){
     try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

          if(!response.ok){
               throw new Error("Network response was not ok");
          }

          const data = await response.json(); //convert the response into data
          
          const temperature = Math.round(data.main.temp)

          const description = data.weather[0].description

          const icon = data.weather[0].icon

          const details = [
               `Feels like: ${Math.round(data.main.feels_like)}°C`,
               `Humidity: ${data.main.humidity}%`,
               `Wind Speed: ${data.wind.speed} m/s`,

          ]

        weatherDataE1.querySelector(".icon").innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataE1.querySelector(".temperature").textContent= `${temperature}°C`;
        weatherDataE1.querySelector(".description").textContent = description;

        weatherDataE1.querySelector(".details").innerHTML = details.map((details)=>`<div>${details}</div>`).join("");
     } catch (error) {
          weatherDataE1.querySelector(".icon").innerHTML = "";
          weatherDataE1.querySelector(".temperature").textContent= "";
          weatherDataE1.querySelector(".description").textContent = "An error happened, please try again later";
  
          weatherDataE1.querySelector(".details").innerHTML = "";
     }
}