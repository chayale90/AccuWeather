import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { delSingleItem } from "../../features/featuresSlice";
import { changeflagSeeMore,findCurrentCityObj } from "../../features/featuresSlice";

export default function FavoriteItem({ item }) {
    const nav = useNavigate()
    const dispatch = useDispatch();
    
    const onClickSeeMore = () => {
        nav("/")
        dispatch(changeflagSeeMore({ val: true }))
        dispatch(findCurrentCityObj({ val: item.name }))
    }

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
                    onClick={onClickSeeMore}
                    className='btn btn-primary'>See More details
                </button>
            </div>
        </div >

    )
}
