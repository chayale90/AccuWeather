import React from 'react'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LoadingComp from '../../general_comps/loadingComp';
export default function DayItem({ index, item, isCelsius }) {

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const toCelsius = (fahrenheit) => Math.floor((fahrenheit - 32) * 5 / 9);

  return (
    <div className='dayItem col-md-4'>
      {item.Day ? (
        <div className='border rounded h-100 overflow-hidden p-2 text-center'>
          <h4 className='dayName'>{daysOfWeek[index]}</h4>
          <div className='mb-4'>
            <div className='day'>
              <WbSunnyIcon sx={{ mr: 1 }} />{item.Day.IconPhrase}
            </div>
            <div className='night'>
              <NightlightRoundIcon sx={{ mr: 1 }} />{item.Night.IconPhrase}
            </div>
          </div>
          <h6>
            <span className='text-success'>Min: </span>
            {
              (isCelsius) ? toCelsius(item.Temperature?.Minimum?.Value) + "°C" : item.Temperature?.Minimum?.Value + "°F"
            }
          </h6>
          <h6>
            <span className='text-danger'>Max: </span>
            {
              (isCelsius) ?  toCelsius(item.Temperature?.Maximum?.Value) + "°C" : item.Temperature?.Maximum?.Value + "°F"
            }
          </h6>
        </div>
      ) : (
        <LoadingComp />
      )}
    </div>
  );
}