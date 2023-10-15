
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// project imports
import WeatherInput from "./weatherInput";
import WeatherInfo from "./WeatherInfo";
import DaysList from "./daysList/daysList";
import { theme } from '../../services/theme'
import { addNewItem } from "../../features/featuresSlice";
import useWeatherData from "../../hooks/useFetchWeather";
import LoadingComp from "../general_comps/loadingComp";


const AppWeather = () => {
    const dispatch = useDispatch();

    //hook
    const {
        autocompleteObj,
        currentWeather,
        daysArr,
        headlineWeek,
        fetchWeatherData
    } = useWeatherData();

    //favorites
    const [isLiked, setIsLiked] = useState(false);
    const { arrFavorites } = useSelector((myStore) => myStore.featuresSlice);

    //darkMode
    const { darkMode, flagSeeMore } = useSelector(myStore => myStore.featuresSlice);
    const modeBackground = useMemo(() => {
        if (darkMode)
            return theme.palette.darkMode.main
        return theme.palette.success.main
    }, [darkMode]);

    useEffect(() => {
        if (!flagSeeMore)
            fetchWeatherData("Tel Aviv");
    }, []);

    const temperatureCelsius = (currentWeather.Temperature?.Metric?.Value) + "°" + (currentWeather.Temperature?.Metric?.Unit);
    const favoriteObj = {
        id: Date.now(),
        name: autocompleteObj.LocalizedName,
        temperature: temperatureCelsius,
        description: currentWeather.WeatherText,
        locationKey: autocompleteObj.Key,
        currentWeather: currentWeather,
        autocompleteObj: autocompleteObj,
        daysArr: daysArr
    }

    const clickOnLike = () => {
        if (!isLiked) {
            dispatch(addNewItem({ val: favoriteObj }))
            setIsLiked(!isLiked);
        }
    }

    console.log(arrFavorites);
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
            <WeatherInput doApi={fetchWeatherData} />
            <div style={{ backgroundColor: modeBackground, minHeight: "400px" }} className="details p-4 rounded">

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

                {(autocompleteObj.Key) ?
                    <>
                        <WeatherInfo currentWeather={currentWeather} />
                        <DaysList daysArr={daysArr} headlineWeek={headlineWeek} />
                    </>
                    : <LoadingComp />
                }

            </div>
        </div>
    )
}

export default AppWeather