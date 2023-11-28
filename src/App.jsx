import "./App.css";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import rainIcon from "./assets/rain.png";
import searchIcon from "./assets/search.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";
import { useEffect, useState } from "react";

const App = () => {
  const [location, setLocation] = useState("Nigeria");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [day, setDay] = useState(clearIcon);
  const apiKey = "52f6e7f624959ec04d96cb613185505e";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${apiKey}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(country);
    setCountry("");
    setLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        console.log(result);
        icon(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, url]);

  const icon = (data) => {
    switch (data.weather[0].description) {
      case "clear sky":
        setDay(clearIcon);
        break;
      case "broken clouds":
      case "scattered clouds":
        setDay(cloudIcon);
        break;
      case "shower rain":
      case "few clouds":
        setDay(drizzleIcon);
        break;
      case "thunderstorm":
        setDay(windIcon);
        break;
      case "snow":
        setDay(snowIcon);
        break;
      case "rain":
        setDay(rainIcon);
        break;
      case "mist":
        setDay(humidityIcon);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p className="weather-temp">Loading...</p>
      ) : (
        <div>
          <form className="top-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Search"
              className="cityInput"
            />
            <div className="search-icon" onClick={handleSubmit}>
              <img src={searchIcon} alt="search icon" />
            </div>
          </form>
          <div className="weather-image">
            <img src={day} alt="" />
          </div>
          <div className="weather-temp">{Math.round(data.main.temp)}&deg;C</div>
          <div className="weather-location">{data.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidityIcon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">{data.main.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={windIcon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">{data.wind.speed} km/hr</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
