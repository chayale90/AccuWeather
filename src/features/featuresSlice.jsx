import { createSlice } from "@reduxjs/toolkit";

// all little things in ui
const initValue = {
    darkMode: false,
    arrFavorites:[]
}

const featuresSlice = createSlice({
    name: "featuresSlice",
    initialState: initValue,
    reducers: {
        //darkMode 
        changeDarkMode: (state) => {
            state.darkMode = !(state.darkMode)
        },
        addArrFavorites: (state, action) => {
            state.arrFavorites = [ ...state.arrFavorites, action.payload.val] 
        },
        removeArrFavorites: (state, action) => {
            const valueToRemove = action.payload.val;
            state.arrFavorites = state.arrFavorites.filter(item => item !== valueToRemove);
        }

    }
})

export const {  changeDarkMode ,addArrFavorites,removeArrFavorites} = featuresSlice.actions;
export default featuresSlice.reducer;