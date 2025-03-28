import React, { useEffect, useState } from "react";
import getWeatherData from "../services/ApiService";
import DisplayWeather from "../components/DisplayWeather";
import backGroundClear from "../assets/image/bg-clear.avif";
import backGroundRain from "../assets/image/bg-rain.jpg";
import backGroundClouds from "../assets/image/bg-blueSky.jpg";
import backGroundMist from "../assets/image/bg-mist.jpg";
import backGroundHome from "../assets/image/bg-simp.jpeg";
import backGround404 from "../assets/image/bg-404.jpg";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("ha noi");
  const [error, setError] = useState("");
  const [weatherState, setWeatherState] = useState("");

  const getData = async () => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data.data);
      setError("");
      setWeatherState(data.data.weather[0].main);
    } catch (error) {
      setError("Thành phố không tồn tại ");
      setWeatherData(null);
      setWeatherState("");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getBackgroundImage = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return `url(${backGroundClear})`;
      case "Rain":
        return `url(${backGroundRain})`;
      case "Clouds":
        return `url(${backGroundClouds})`;

      case "Mist":
        return `url(${backGroundMist})`;
      default:
        return `url(${backGroundHome})`;
    }
  };
  const backgroundStyle = weatherState
    ? {
        backgroundImage: getBackgroundImage(weatherState),
      }
    : error
    ? {
        backgroundImage: `url(${backGround404})`,
      }
    : {
        backgroundImage: `url(${backGroundHome})`,
      };

  return (
    <div className="section-weather" style={backgroundStyle}>
      <div className="flex justify-center items-center   min-h-screen ">
        <div className="bg-rgba[255,255,255,0.5] p-8 rounded-2xl shadow-xl transition-all duration-500 w-[400px] text-gray-700">
          <h1 className="text-3xl font-bold  text-center mb-5">
            Dự báo thời tiết
          </h1>
          <div>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="search"
                className="block w-full p-4  text-md text-pink-700 font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Search city"
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                onClick={() => getData()}
                className="text-white absolute end-2.5 bottom-2.5
          bg-pink-700 hover:bg-blue-300 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
              </button>
            </div>
          </div>
          {error && (
            <p className="mt-5 mb-[130px]  text-3xl text-center pt-[50px] text-orange-950">
              {error}
            </p>
          )}
          {weatherData && (
            <div>
              <DisplayWeather data={weatherData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
