import { createSlice } from "@reduxjs/toolkit";

// all little things in ui
const initValue = {
    darkMode: false,
    arrFavorites: []
   
}

const featuresSlice = createSlice({
    name: "featuresSlice",
    initialState: initValue,
    reducers: {
        //darkMode 
        changeDarkMode: (state) => {
            state.darkMode = !(state.darkMode)
        },
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

    }
})

export const { changeDarkMode, addNewItem, delSingleItem } = featuresSlice.actions;
export default featuresSlice.reducer;