
import axios from "axios";
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from '@mui/material';
// project imports
import WeatherInput from "./weatherInput";
import WeatherInfo from "./WeatherInfo";
import { API_KEY } from '../../services/apiService';
import DaysList from "./daysList/daysList";
import { theme } from '../../services/theme'
import { addNewItem } from "../../features/featuresSlice";


const AppWeather = () => {
    const dispatch = useDispatch();

    const [autocompleteObj, setAutocompleteObj] = useState({});
    const [locationKey, setLocationKey] = useState("");
    const [currentWeather, setCurrentWeather] = useState({});

    //favorites
    const [isLiked, setIsLiked] = useState(false);
    const { arrFavorites } = useSelector((myStore) => myStore.featuresSlice);

    //darkMode
    const { darkMode } = useSelector(myStore => myStore.featuresSlice);
    const modeBackground = useMemo(() => {
        if (darkMode)
            return theme.palette.darkMode.main
        return theme.palette.success.main
    }, [darkMode]);

    useEffect(() => {
        doApi('Tel Aviv');
    }, []);

    const doApi = async (cityName) => {
        try {
            let url_Autocomplete = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${cityName}`;
            let resp = await axios.get(url_Autocomplete);
            if (resp.data == 0) {
                toast.error("Country/city name unknown")
                return;
            }
            setAutocompleteObj(resp.data[0]);
            setLocationKey(resp.data[0].Key)
            let url_Current_conditions = `http://dataservice.accuweather.com/currentconditions/v1/${resp.data[0].Key}?apikey=${API_KEY}`;
            let resp2 = await axios.get(url_Current_conditions);
            setCurrentWeather(resp2.data[0])

        }
        catch (err) {
            console.log("error", err);
            toast.error("Country/city name unknown or the service down")
        }
    }

    const temperatureCelsius = (currentWeather.Temperature?.Metric?.Value) + "°" + (currentWeather.Temperature?.Metric?.Unit);
    const favoriteObj = {
        id: Date.now(),
        name: autocompleteObj.LocalizedName,
        temperature: temperatureCelsius,
        description: currentWeather.WeatherText,
        locationKey: locationKey
    }
    const clickOnLike = () => {
        if (!isLiked) {
            dispatch(addNewItem({ val: favoriteObj }))
            setIsLiked(!isLiked);
        }
    }

    //check if the weather obj exist in favorite array and update the 'isLiked' state 
    useMemo(() => {
        let isCurrentlyLiked = false;
        for (let i = 0; i < arrFavorites.length; i++) {
            if (arrFavorites[i].name === autocompleteObj.LocalizedName) {
                isCurrentlyLiked = true;
                break; // No need to continue searching if found
            }
        }
        setIsLiked(isCurrentlyLiked);
    }, [arrFavorites, autocompleteObj.LocalizedName]);


    return (
        <div>
            <WeatherInput doApi={doApi} />
            <div style={{ backgroundColor: modeBackground, minHeight: "400px" }} className="details p-4">

                <div className='d-flex justify-content-between'>
                    <h1 className='display-6'>{autocompleteObj.LocalizedName}</h1>
                    <div className="d-flex align-items-center">
                        <h6 className="addFavorite m-0">Add to favorite</h6>
                        <IconButton onClick={clickOnLike}
                            aria-label="add to favorites"
                        >
                            {!isLiked ? (
                                <FavoriteBorderIcon />
                            ) : (
                                <FavoriteIcon sx={{ color: "red" }} />
                            )}
                        </IconButton>
                    </div>
                </div>

                {(locationKey) ?
                    <>
                    <WeatherInfo currentWeather={currentWeather} />
                        <DaysList locationKey={locationKey} />
                    </>
                    : <div className="display-4">Loading...</div>
                }
            </div>
        </div>
    )
}

export default AppWeather