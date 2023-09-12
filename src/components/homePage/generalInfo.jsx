
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addArrFavorites, removeArrFavorites } from "../../features/featuresSlice";

export default function GeneralInfo({ autocompleteObj }) {
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();
    const { arrFavorites } = useSelector((myStore) => myStore.featuresSlice);
    console.log(arrFavorites);

    const clickOnLike = () => {
        if (!isLiked) {
            dispatch(addArrFavorites({ val: autocompleteObj }))
            setIsLiked(!isLiked);
        }
        else {
            dispatch(removeArrFavorites({ val: autocompleteObj }))
            setIsLiked(!isLiked);
        }
    }
    console.log(arrFavorites);
    return (
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
    )
}
