import { createSlice } from "@reduxjs/toolkit";

const initialtheme = {
    darkmode: false
}

const themeSlice = createSlice({
    name: "theme",
    initialState: initialtheme,
    reducers:{
        toggleTheme:(state)=>{
            state.darkmode = !state.darkmode
        }
    }
})

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer