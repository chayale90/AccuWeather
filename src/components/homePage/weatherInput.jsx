import { useRef } from 'react'

const WeatherInput = ({ doApi }) => {

    const inputRef = useRef();

    return (
        <div className='container-fluid py-4'>
            <nav className="container">
                <div className='col-md-7 d-flex mx-auto text-center'>
                    <input
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                doApi(inputRef.current.value);
                                console.log(inputRef.current.value);
                            }
                        }}
                        ref={inputRef} type="text" className='form-control' placeholder='Search for city/town...' />
                    <button onClick={() => {
                            doApi(inputRef.current.value);
                            console.log(inputRef.current.value);
                        }}
                        className='btn btn-primary ms-2'>Search</button>
                </div>
            </nav>
        </div>
    )
}

export default WeatherInput