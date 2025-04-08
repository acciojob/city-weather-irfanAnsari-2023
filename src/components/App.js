import React, { useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "YOUR_API_KEY_HERE"; // Replace this with your actual OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setWeatherData(null);
        alert("City not found!");
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <input
        className="search"
        type="text"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {weatherData && (
        <div className="weather">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>{weatherData.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />
        </div>
      )}
    </div>
  );
};

export default App;
