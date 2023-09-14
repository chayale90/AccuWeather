import { createSlice } from "@reduxjs/toolkit";

const initValue = {
    darkMode: false,
    arrFavorites: [],
    flagSeeMore: false,
    currentCityObj: {}
}

const featuresSlice = createSlice({
    name: "featuresSlice",
    initialState: initValue,
    reducers: {
        //darkMode 
        changeDarkMode: (state) => {
            state.darkMode = !(state.darkMode)
        },
        //Favorite
        addNewItem: (state, action) => {
            let val = false;
            for (let i = 0; i < state.arrFavorites.length; i++) {
                if (state.arrFavorites[i].name == action.payload.val.name) {
                    val = true;
                    break;
                }
            }
            if (val) return;
            state.arrFavorites = [...state.arrFavorites, action.payload.val]
        },
        delSingleItem: (state, action) => {
            state.arrFavorites = state.arrFavorites.filter(
                (item) => item.locationKey != action.payload.val
            );
        },
        //  button SeeMore in favoriteItem
        changeflagSeeMore: (state, action) => {
            state.flagSeeMore = action.payload.val;
        },
        findCurrentCityObj: (state, action) => {
            for (let i = 0; i < state.arrFavorites.length; i++) {
                if (state.arrFavorites[i].name == action.payload.val) {
                    state.currentCityObj = state.arrFavorites[i]
                }
            }
        }
    }
})

export const { changeDarkMode, addNewItem, delSingleItem, changeflagSeeMore,findCurrentCityObj } = featuresSlice.actions;
export default featuresSlice.reducer;