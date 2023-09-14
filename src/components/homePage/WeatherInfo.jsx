import React, { useState } from 'react'
import Switch from '@mui/material/Switch';


export default function WeatherInfo({ currentWeather }) {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className='mt-2'>
      {
        isCelsius ?
          <h4> {currentWeather.Temperature?.Metric?.Value}° {currentWeather.Temperature?.Metric?.Unit} </h4>
          :
          <h4> {currentWeather.Temperature?.Imperial?.Value}° {currentWeather.Temperature?.Imperial?.Unit}  </h4>
      }
      <Switch
        checked={isCelsius}
        onChange={toggleUnit}
        color="primary"
        inputProps={{ 'aria-label': 'toggle temperature unit' }}
      />

      <h2 className='text-center display-5 text-primary'>{currentWeather?.WeatherText}</h2>

    </div >
  )
}
