

const weather = document.querySelector(".weather");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "8ad22d8da6b3f6f24a9a118322931874";

updateClock();
setInterval(updateClock, 1000);

weather.addEventListener("submit", async event =>{

  event.preventDefault();

  const city = cityInput.value;

  if (city){
    try{
      const weatherData = await getWeather(city);
      displayWeather(weatherData);
    }catch (error){
      console.error(error);
      displayError(error)
    }
  }else{
    displayError("Please enter a city");
  }
});

async function getWeather (city){
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok){
    throw  new Error("Could not fetch weather data")
  }

  return await response.json();

}

function displayWeather (data){
  // temperature by default is in kelvin

  const {name: city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;

// id might be useful for future features

  card.textContent = ""
  card.style.display = "flex"

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = temp;
  humidityDisplay.textContent = humidity;
  descDisplay.textContent = description;

  cityDisplay.classList.add("city-display");
  tempDisplay.classList.add("temp-display");
  humidityDisplay.classList.add("humidity-display");
  descDisplay.classList.add("desc-display");

  card.appendChild(cityDisplay)
  card.appendChild(tempDisplay)
  card.appendChild(humidityDisplay)
  card.appendChild(descDisplay)
}

function displayError (message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error-display");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

// clock program

function updateClock (){
  const now = new Date();
  let hours = now.getHours();
  let meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 ||12;
  hours = hours.toString().padStart(2, 0);
  const minutes = now.getMinutes().toString().padStart(2, 0);
  const seconds = now.getSeconds().toString().padStart(2, 0);
  const time = `${hours}:${minutes}:${seconds}`;
  let meridiemSpan = document.getElementById("meridiem");
  document.getElementById("clock").innerHTML= time;
  meridiemSpan.textContent = `${meridiem}`.toLocaleLowerCase();
}