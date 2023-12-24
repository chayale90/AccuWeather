import { useRef } from 'react'
import "./weatherInput.css"
const WeatherInput = ({ doApi }) => {

    const inputRef = useRef();

    return (
        <div className="py-4 col-md-7 d-flex mx-auto text-center">
            <input
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        doApi(inputRef.current.value);
                    }
                }}
                ref={inputRef} type="text"
                className='form-control'
                placeholder='Search for city/town...'
            />

            <button
            className="btnSearch ms-2"
            onClick={() => {
                doApi(inputRef.current.value);
            }}
            >Search
            </button>

        </div>
    )
}

export default WeatherInput