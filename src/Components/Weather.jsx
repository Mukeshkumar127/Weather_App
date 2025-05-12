import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "f2e97657d11638088c7c34aa3a53f488"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with an error status
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // No response was received from the server
        alert("No response from server. Please check your internet connection.");
      } else {
        // Other unexpected errors
        alert("An unexpected error occurred.");
      }
      setWeather(null);
    }
    
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
