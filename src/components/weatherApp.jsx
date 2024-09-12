import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import { useState, useEffect } from "react";

const weatherApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const api_key = "b847a290742564c8c3c1bf30cd03b1f9";

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = "Addis Ababa";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
    };
    fetchDefaultWeather();
  }, []);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };
  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(searchData);
        setLocation("");
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };
  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;
  const currentDate = new Date();
  const daysOfWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayOfWeak = daysOfWeak[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = [currentDate.getDate()];
  const formattedDate = `${dayOfWeak}, ${dayOfMonth}, ${month}`;
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter city name"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>

        {data.notFound ? (
          <div className="not-found">Couldn't find the City</div>
        ) : (
          <div className="weather">
            <img src={weatherImage} alt="sunny" />
            <div className="weather-type">
              {data.weather ? data.weather[0].main : null}
            </div>
            <div className="temp">
              {data.main ? `${Math.floor(data.main.temp)}°` : null}C
            </div>
            <div className="weather-date">
              <p>{formattedDate}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">
                  {data.main ? data.main.humidity : null}%
                </div>
              </div>
              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">
                  {data.wind ? data.wind.speed : null}km/hr
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default weatherApp;
