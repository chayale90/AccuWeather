import React, { useEffect, useState } from 'react'
import axios from "axios";
// project imports
import { API_KEY } from '../../../services/apiService';
import DayItem from './dayItem';

export default function DaysList({ locationKey }) {
    const [daysArr, setDaysArr] = useState([]);

    useEffect(() => {
        if (locationKey)
            doApiDaysList()
    }, [locationKey])

    const doApiDaysList = async () => {
        try {
            let url_5days = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`;
            let resp = await axios.get(url_5days);
            setDaysArr(resp.data.DailyForecasts)
            console.log(resp.data.DailyForecasts)
        }
        catch (err) {
            console.log("error", err);
            toast.error("City name unknown or the service down")
        }
    }

    return (
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
    )
}
