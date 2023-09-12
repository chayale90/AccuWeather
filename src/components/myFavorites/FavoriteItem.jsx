import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-toastify"
// project imports
import { API_KEY } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function FavoriteItem({ item }) {
    const [currentWeather, setCurrentWeather] = useState({});
    const locationKey = item.Key;
    const nav = useNavigate()
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

    return (
        <div className='favoriteItem col-md-4 '>
            <div className='border h-100 overflow-hidden p-3 text-center'>

                <h3 className='text-primary'>{item.LocalizedName}</h3>
                {/* <h3>{item.Key}</h3> */}
                <h4> {currentWeather.Temperature?.Metric?.Value}° {currentWeather.Temperature?.Metric?.Unit} </h4>
                <h3 className='mt-5'>{currentWeather?.WeatherText}</h3>
                <button
                    onClick={() => { nav("/"+item?.LocalizedName) }}
                    className='btn btn-light'>See More
                    </button>
            </div>
        </div>

    )
}
