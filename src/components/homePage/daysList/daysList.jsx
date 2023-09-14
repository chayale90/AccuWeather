import React from 'react'
// project imports
import DayItem from './dayItem';

export default function DaysList({ daysArr,headlineWeek }) {

    return (
        <>
            <div className="row g-4 justify-content-center mt-4">
                {daysArr.map((item, i) => {
                    return (
                        <DayItem
                            key={item.EpochDate}
                            index={i}
                            item={item}
                        />
                    );
                })}
                {daysArr.length < 1 &&
                    <h5>Loading...</h5>
                }

            </div>
            <h5 className='my-3 text-center'>{headlineWeek}</h5>
        </>
    )
}
