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

    let time = `${hours}:${minutes}`;
    let today = `${currentDay} ${currentDate} ${currentMonth}, ${time}`;
    return today;
}

function showTemperaure(response) {
    console.log(response);
    let city = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#sky");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    let dateElement = document.querySelector("#date");
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apikey = "c0e61b09ce3783df76abc904136f7ab8";
let city = "Amsterdam";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(showTemperaure);