/** @format */

function formatDate(timestamp) {
    let date = new Date(timestamp);

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let currentDay = days[date.getDay()];
    let currentDate = date.getDate();
    let currentMonth = months[date.getMonth()];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    function changeCardColor(hours) {
        let card = document.querySelector("#card");
        if (hours >= 6 && hours < 9) {
            card.classList.add("morning");
        }
        if (hours >= 9 && hours < 17) {
            card.classList.add("midday");
        }
        if (hours >= 17 && hours < 21) {
            card.classList.add("afternoon");
        }
        if (hours < 6 || hours >= 21) {
            card.classList.add("night");
            let date = document.querySelector("#date");
            let info = document.querySelector("#info");
            info.classList.add("night-date");
            date.classList.add("night-date");
        }
    }
    changeCardColor(hours);

    let time = `${hours}:${minutes}`;
    let today = ` ${currentDay} ${currentDate} ${currentMonth}, Last updated: ${time}`;
    return today;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function getForecast(coordinates) {
    let apikey = "c0e61b09ce3783df76abc904136f7ab8";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let dailyForecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    dailyForecast.forEach(function(forecastday, index) {
        if (index > 0 && index < 6) {
            forecastHTML =
                forecastHTML +
                `<div class="col">
               <div class="forecast-date">${formatDay(forecastday.dt)}</div>
               <img src="http://openweathermap.org/img/wn/${
									forecastday.weather[0].icon
								}@2x.png" alt="" width="50px" />    
               <div class="forecast-temp">
                 <span class="forecast-temp-max">${Math.round(
										forecastday.temp.max
									)}°</span>
                 <span class="forecast-temp-min">${Math.round(
										forecastday.temp.min
									)}°</span>
               </div>
            </div>`;
        }
    });

    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
}

function showTemperaure(response) {
    let city = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    temperature = response.data.main.temp;
    let descriptionElement = document.querySelector("#sky");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    let dateElement = document.querySelector("#date");

    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    getForecast(response.data.coord);
}

function search(city) {
    let apikey = "c0e61b09ce3783df76abc904136f7ab8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    axios.get(apiUrl).then(showTemperaure);
}

function getCity(event) {
    event.preventDefault();
    let searchCityElement = document.querySelector("#search-city");
    search(searchCityElement.value);
}

let temperature = null;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

search("Amsterdam");