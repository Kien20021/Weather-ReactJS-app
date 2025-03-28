import axios from "axios";
import API_WEATHER from "../constants/ApiWeather";

const API_KEY = import.meta.env.VITE_API_KEY;
const getWeatherData = async (cityname) => {
  try {
    const data = await axios.get(
      API_WEATHER + `&q=${cityname}&appid=${API_KEY}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export default getWeatherData;
