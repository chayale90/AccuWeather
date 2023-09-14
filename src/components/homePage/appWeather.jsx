
import axios from "axios";
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from '@mui/material';
// project imports
import WeatherInput from "./weatherInput";
import GeneralInfo from "./generalInfo";
import WeatherInfo from "./WeatherInfo";
import { API_KEY } from '../../services/apiService';
import DaysList from "./daysList/daysList";
import { theme } from '../../services/theme'
import { addNewItem } from "../../features/featuresSlice";


const AppWeather = () => {
    const [autocompleteObj, setAutocompleteObj] = useState({});
    const [locationKey, setLocationKey] = useState("");

    //favorites
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();
    const { arrFavorites } = useSelector((myStore) => myStore.featuresSlice);
    console.log(arrFavorites);

    const [currentWeatherObj, setCurrentWeatherObj] = useState({});

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
            console.log(resp.data[0]);
            // console.log({ key: resp.data[0].Key });
            setLocationKey(resp.data[0].Key)
        }
        catch (err) {
            console.log("error", err);
            toast.error("Country/city name unknown or the service down")
        }
    }

    // Callback function to receive and handle currentWeather data
    const handleCurrentWeather = (data) => {
        setCurrentWeatherObj(data);
    };

    const temperatureCelsius = (currentWeatherObj.Temperature?.Metric?.Value) + "°" + (currentWeatherObj.Temperature?.Metric?.Unit);
    const favoriteObj = {
        id: Date.now(),
        name: autocompleteObj.LocalizedName,
        temperature: temperatureCelsius,
        description: currentWeatherObj.WeatherText,
        locationKey: locationKey
    }
    const clickOnLike = () => {
        if (!isLiked) {
            dispatch(addNewItem({ val: favoriteObj }))
            setIsLiked(!isLiked);
        }
        console.log(favoriteObj);
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
                    <GeneralInfo autocompleteObj={autocompleteObj} />

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
                        <WeatherInfo locationKey={locationKey} onCurrentWeatherObj={handleCurrentWeather} />
                        <DaysList locationKey={locationKey} />
                    </>
                    : <div className="display-4">Loading...</div>
                }
            </div>
        </div>
    )
}

export default AppWeather