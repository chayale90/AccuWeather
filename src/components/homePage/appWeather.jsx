
import axios from "axios";
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux";
// project imports
import WeatherInput from "./weatherInput";
import GeneralInfo from "./generalInfo";
import WeatherInfo from "./WeatherInfo";
import { API_KEY } from '../../services/apiService';
import DaysList from "./daysList/daysList";
import { theme } from '../../services/theme'
import { useParams } from "react-router-dom";


const AppWeather = () => {
    const params = useParams();
    // console.log(params[countryName]);
    const [autocompleteObj, setAutocompleteObj] = useState({});
    const [locationKey, setLocationKey] = useState("");

    //darkMode
    const { darkMode } = useSelector(myStore => myStore.featuresSlice);
    const modeBackground = useMemo(() => {
        if (darkMode)
            return theme.palette.darkMode.main
        return theme.palette.success.main
    }, [darkMode]);

    useEffect(() => {
        // if (params[countryName]) {
        //     doApi(params[countryName])
        // }
            doApi('tel aviv')
    }, [])

    const doApi = async (cityName) => {
        try {
            let url_Autocomplete = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${cityName}`;
            let resp = await axios.get(url_Autocomplete);
            if (resp.data == 0) {
                toast.error("Country/city name unknown or the service down")
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

    return (
        <div >
            <WeatherInput doApi={doApi} />
            <div style={{ backgroundColor: modeBackground, minHeight: "400px" }} className="details p-4">
                <div>
                    <GeneralInfo autocompleteObj={autocompleteObj} />
                </div>

                {(locationKey) ?
                    <>
                        <WeatherInfo locationKey={locationKey} />
                        <DaysList locationKey={locationKey} />
                    </>
                    : <div>Loading</div>
                }
            </div>
        </div>
    )
}

export default AppWeather