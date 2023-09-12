
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
// project imports
import WeatherInput from "./weatherInput";
import GeneralInfo from "./generalInfo";
import WeatherInfo from "./WeatherInfo";
import { API_KEY } from '../../services/apiService';

const AppWeather = () => {
    const [autocompleteObj, setAutocompleteObj] = useState({});
    const [locationKey, setLocationKey] = useState(Number);
    const [daysArr, setDaysArr] = useState([]);

    useEffect(() => {
        doApi('tel aviv');
    }, [])

    const doApi = async (cityName) => {
        try {
            let url_Autocomplete = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${cityName}`;
            let resp = await axios.get(url_Autocomplete);
            setAutocompleteObj(resp.data[0]);
            // console.log(resp.data[0]);
            // console.log({ key: resp.data[0].Key });
            setLocationKey(resp.data[0].Key)


            // let url_5days = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/213225?apikey=${API_KEY}`;
            // let resp3 = await axios.get(url_5days);
            // setDaysArr(resp3.data.DailyForecasts)
            // console.log(resp3.data.DailyForecasts)
        }
        catch (err) {
            console.log("error", err);
            toast.error("Country/city name unknown or the service down")
        }
    }

    return (
        <div>
            <WeatherInput doApi={doApi} />
            <div className="details p-4 p-md-5">
                <div className="d-flex justift-content-between ">
                    <GeneralInfo autocompleteObj={autocompleteObj} />
                    {/* <h6 className="addFavorite">Add to favorite</h6> */}
                </div>


                {(locationKey) ?
                    <WeatherInfo locationKey={locationKey} />
                    : <div>Loading</div>
                }


            </div>

        </div>
    )
}

export default AppWeather