const apiKey = "2b5b1a38accda38f454ae691f7354fd8";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".city-input");
const searchBtn = document.querySelector("#btn");
const weatherBox = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(
      apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`
    );

    const data = await response.json();

    
    if (!response.ok) {
      alert(data.message || "City not found");
      return;
    }

 
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").textContent =
      data.main.humidity + "%";
    document.querySelector(".wind-speed").textContent =
      data.wind.speed + " km/h";

    
    const condition = data.weather[0].main;

    if (condition === "Clouds") weatherIcon.src = "clouds.png";
    else if (condition === "Clear") weatherIcon.src = "clear.png";
    else if (condition === "Rain") weatherIcon.src = "rain.png";
    else if (condition === "Drizzle") weatherIcon.src = "drizzle.png";
    else if (condition === "Mist") weatherIcon.src = "mist.png";
    else if (condition === "Snow") weatherIcon.src = "snow.png";
    else weatherIcon.src = "images/clear.png";

   
    weatherBox.style.display = "block";
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Try again later.");
  }
}


searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  checkWeather(city);
});


searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
