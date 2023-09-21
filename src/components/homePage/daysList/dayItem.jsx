import React from 'react'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LoadingComp from '../../general_comps/loadingComp';
export default function DayItem({ index, item }) {

  const days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className='dayItem col-md-4'>
      {item.Day ? (
        <div className='border rounded h-100 overflow-hidden p-2 text-center'>
          <h4 className='dayName'>{days_of_week[index]}</h4>
          <div className='mb-4'>
            <div className='day'>
              <WbSunnyIcon sx={{ mr: 1 }} />{item.Day.IconPhrase}
            </div>
            <div className='night'>
              <NightlightRoundIcon sx={{ mr: 1 }} />{item.Night.IconPhrase}
            </div>
          </div>
          <h6><span className='text-success'>Min: </span>{item.Temperature?.Minimum?.Value}° {item.Temperature?.Minimum?.Unit}</h6>
          <h6><span className='text-danger'>Max: </span>{item.Temperature?.Maximum?.Value}° {item.Temperature?.Maximum?.Unit}</h6>
        </div>
      ) : (
        <LoadingComp />
      )}
    </div>
  );
}