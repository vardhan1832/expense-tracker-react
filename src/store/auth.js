import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
        token: localStorage.getItem('token') || null,
        isLoggedIn: localStorage.getItem('token') ? true : false
    }


const authSlice = createSlice({
    name: "auth",
    initialState:initialAuthState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn=true;
            state.token = action.payload.token
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('email',action.payload.email)
        },
        logout:(state)=>{
            state.isLoggedIn=false;
            state.token= null;
            localStorage.removeItem('token')
            localStorage.removeItem('email')
        }
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer