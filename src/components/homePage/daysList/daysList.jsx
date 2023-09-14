import React from 'react';
import DayItem from './dayItem'; // Import the DayItem component
import LoadingComp from '../../general_comps/loadingComp';

export default function DaysList({ daysArr, headlineWeek }) {
  return (
    <>
      <div className="row g-4 justify-content-center mt-4">
        {daysArr.length > 0 ? (
          daysArr.map((item, i) => (
            <DayItem key={item.EpochDate} index={i} item={item} />
          ))
        ) : (
          <LoadingComp />
        )}
      </div>
      <h5 className='my-3 text-center'>{headlineWeek}</h5>
    </>
  );
}
