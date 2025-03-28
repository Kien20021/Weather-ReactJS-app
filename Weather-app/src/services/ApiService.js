import axios from "axios";
const API_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?lang=vi&units=metric";
const API_KEY = "02ac31aab528819053457737dd81930f";
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
