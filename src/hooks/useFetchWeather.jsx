// custom hook 

import { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY

const useWeatherData = () => {
  const [autocompleteObj, setAutocompleteObj] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [daysArr, setDaysArr] = useState([]);

  const fetchWeatherData = async (cityName) => {
    try {
      let url_autocomplete = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}`;
      let resp = await axios.get(url_autocomplete);
      if (resp.data == 0) {
        toast.error("Country/city name unknown");
        return;
      }
      setAutocompleteObj(resp.data[0]);

      let url_current_conditions = `https://dataservice.accuweather.com/currentconditions/v1/${resp.data[0].Key}?apikey=${apiKey}`;
      let resp2 = await axios.get(url_current_conditions);
      setCurrentWeather(resp2.data[0]);

      let url_5days = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${resp.data[0].Key}?apikey=${apiKey}`;
      let resp3 = await axios.get(url_5days);
      setDaysArr(resp3.data.DailyForecasts);
    } catch (err) {
      console.log("error", err);
      toast.error("Country/city name unknown or the service is down");
    }
  };

  // Redux state and effect
  const { flagSeeMore, currentCityObj } = useSelector((myStore) => myStore.featuresSlice);

  useMemo(() => {
    if (flagSeeMore) {
      setAutocompleteObj(currentCityObj.autocompleteObj)
      setCurrentWeather(currentCityObj.currentWeather)
      setDaysArr(currentCityObj.daysArr)
    }
  }, [flagSeeMore, currentCityObj])

  return {
    autocompleteObj,
    currentWeather,
    daysArr,
    fetchWeatherData,
  };
};

export default useWeatherData;
