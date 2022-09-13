// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// ba1e475366c43564185a40765ededf1d

const weatherApi = {
  key: "ba1e475366c43564185a40765ededf1d",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("inputBox");

searchInputBox.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    searchInputBox.value = "";
    
    let weather_body = document.getElementById('weather-body');
    weather_body.style.display = 'block'
  }
});

const btn = document.getElementById('btn');

btn.addEventListener('click', (event) => {
    getWeatherReport(searchInputBox.value);
    searchInputBox.value = "";

    let weather_body = document.getElementById('weather-body');
    weather_body.style.display = 'block';
})

function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

function showWeatherReport(weather) {
  console.log(weather);
  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let max_min = document.getElementById("min-max");
  max_min.innerHTML = `${Math.floor(
    weather.main.temp_max
  )}&deg; C (min)/${Math.ceil(weather.main.temp_max)}&deg; C (max)`;
  let weatherType  = document.getElementById('weather');
  weatherType.innerHTML = `${weather.weather[0].main}`;

  if(weatherType.innerHTML == 'Clear') {
    document.body.style.backgroundImage = "url('./images/clear.jpg')"
  }

 else if(weatherType.innerHTML == 'Clouds') {
    document.body.style.backgroundImage = "url('./images/cloud.jpg')"
  }
  else if(weatherType.innerHTML == 'Haze') {
    document.body.style.backgroundImage = "url('./images/cloud.jpg')"
  }
  else if(weatherType.innerHTML == 'Rain') {
    document.body.style.backgroundImage = "url('./images/rain.jpg')"
  }
  else if(weatherType.innerHTML == 'Snow') {
    document.body.style.backgroundImage = "url('./images/snow.jpg')"
  }
  else if(weatherType.innerHTML == 'Thunderstorm') {
    document.body.style.backgroundImage = "url('./images/thunderstorm.jpg')"
  }
}

function dateManage(todayDate) {
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
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = todayDate.getFullYear();
  let month = months[todayDate.getMonth()];

  let date = todayDate.getDate();
  let day = days[todayDate.getDay()];

  return `${date} ${month} (${day}) ${year}`;
}
