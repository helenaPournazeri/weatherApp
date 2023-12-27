import getWeatherData from "./utils/httpReq.js";

const input = document.querySelector(".top-banner form input");
const form = document.querySelector(".top-banner form");
const msg = document.querySelector(" .top-banner .msg")
const overallWeather = document.getElementById("overall-Weather-section")
const forecastWeather = document.getElementById("forecast-weather-section")
const locationImg = document.querySelector(".location-img");
const loader = document.getElementById("loader");
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]


const renderCurrentData = (data) => {
    loader.style.display = "inline-block"
    const {main:{temp,humidity}, name, sys:{country}, weather,wind: {speed}} = data;
    const {description,icon} = weather[0];
    overallWeather.innerHTML = `
            <h1>${name} , ${country}</h1>
            <div class="description">
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="">
                <span>${description}</span>
                <span>${Math.round(temp)} °C</span>
            </div>
            <div class="ingredient">
                <div>humidity: <span>${humidity}%</span></div>
                <div>wind speed: <span>${speed} m/s</span></div>
            </div>
    `
    overallWeather.style.backgroundColor = "#fff"
}
const renderForecastData = (data) => {
    loader.style.display = "inline-block"
    forecastWeather.innerHTML = ""
    data= data.list.filter(obj => obj.dt_txt.endsWith("12:00:00"))
    data.forEach(i => {
        const {description, icon}= i.weather[0]
        const foreCast = `
            <div>
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="">
                <p>${days[new Date(i.dt * 1000).getDay()]}</p>
                <p>${Math.round(i.main.temp)} °C</p>
                <p>${description}</p>
            </div>
        `
        forecastWeather.innerHTML += foreCast;
    })
}


const successCallback = async (position) => {
    const {latitude,longitude} = position.coords;
    const currentData = await getWeatherData("current", position.coords);
    renderCurrentData(currentData);
    const forecastData = await getWeatherData("forecast", position.coords);
    renderForecastData(forecastData)
    input.value = ""
    msg.innerText = ""
    loader.style.display = "none"
  };
  
  const errorCallback = (error) => {
    alert("user denied geolocation")
  };

const locationHandler = () => {
    if (navigator.geolocation) {
    loader.style.display = "inline-block"
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    overallWeather.innerHTML = ""
    } else {
        alert("your browser doesn't support geolocation");
    }
}

const searchHandler = async(e) => {
    e.preventDefault()
    let cityName = input.value;

    if(!cityName) {
        msg.innerText = "please enter a city name"
    } else {
        const currentData = await getWeatherData("current", cityName);
        renderCurrentData(currentData)
        const forecastData = await getWeatherData("forecast", cityName);
        renderForecastData(forecastData)
        input.value = ""
        msg.innerText = ""
        loader.style.display = "none"
    }
}


form.addEventListener("submit", searchHandler);
locationImg.addEventListener("click", locationHandler);
