import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAnimate, usePresence } from "framer-motion";
import { delSingleItem } from "@/features/featuresSlice";
import { changeflagSeeMore, findCurrentCityObj } from "@/features/featuresSlice";
import "./favoriteItem.css";

export default function FavoriteItem({ item, index }) {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (isPresent) {
            const enterAnimation = async () => {
                await animate(scope.current,
                    { opacity: [0, 1] },
                    { duration: 0.5, delay: 0.1 * index }
                )
            }
            enterAnimation();
        }
    });

    const onClickSeeMore = () => {
        nav("/")
        dispatch(changeflagSeeMore({ val: true }))
        dispatch(findCurrentCityObj({ val: item.name }))
    }

    return (
        <div className=' col-md-4'>
            <div ref={scope}
                className='favoriteItem h-100 overflow-hidden p-3 text-center'
            >
                <button onClick={() => {
                    dispatch(delSingleItem({ val: item.locationKey }))
                }} className=' btnX float-end'>x</button>

                <h3 className='text-primary'>{item.name}</h3>
                <h4>{item.temperature} </h4>
                <h3 className='mt-5'>{item?.description}</h3>
                <button
                    onClick={onClickSeeMore}
                    className='seeMoreBtn'>See More details
                </button>
            </div>
        </div >

    )
}
