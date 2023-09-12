import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify"
import Switch from '@mui/material/Switch';
// project imports
import { API_KEY } from '../../services/apiService';

export default function WeatherInfo({ locationKey }) {

  const [currentWeather, setCurrentWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);

  console.log(locationKey)
  console.log(currentWeather)
  console.log({ isCelsius });
  
  useEffect(() => {
    if (locationKey) {
      doApiCurrentWeather()
    }
  }, [])

  const doApiCurrentWeather = async () => {
    try {
      let url_Current_conditions = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`;
      let resp2 = await axios.get(url_Current_conditions);
      setCurrentWeather(resp2.data[0])
      console.log(resp2.data[0])
    }
    catch (err) {
      console.log("error", err);
      toast.error("City name unknown or the service down")
    }
  }

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div>
      <Switch
        checked={isCelsius}
        onChange={toggleUnit}
        color="primary"
        inputProps={{ 'aria-label': 'toggle temperature unit' }}
      />

      {
        isCelsius ?
          <h4> {currentWeather.Temperature?.Metric?.Value}° {currentWeather.Temperature?.Metric?.Unit} </h4>
          : 
          <h4> {currentWeather.Temperature?.Imperial?.Value}° {currentWeather.Temperature?.Imperial?.Unit}  </h4>
      }
      <h2 className='text-center display-5 text-primary'>{currentWeather?.WeatherText}</h2>

    </div >
  )
}
