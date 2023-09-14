import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className='not-found-comp bg-light p-5 text-center'>not Found! please click to go to
            <Link to="/"> home-Page</Link>
        </div>

    )
}
