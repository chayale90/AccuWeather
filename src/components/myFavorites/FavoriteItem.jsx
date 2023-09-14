import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { delSingleItem } from "../../features/featuresSlice";

export default function FavoriteItem({ item }) {
    const nav = useNavigate()
    const dispatch = useDispatch();

    return (
        <div className='favoriteItem col-md-4 '>
            <div className='border h-100 overflow-hidden p-3 text-center'>
                
                <button onClick={() => {
                     dispatch(delSingleItem({ val: item.locationKey })) 
                }} className='btn btn-danger float-end'>x</button>
 
                <h3 className='text-primary'>{item.name}</h3>
                <h4>{item.temperature} </h4>
                <h3 className='mt-5'>{item?.description}</h3>
                <button
                    onClick={() => { nav("/" + item.name) }}
                    className='btn btn-light'>See More details
                </button>
            </div>
        </div>

    )
}
