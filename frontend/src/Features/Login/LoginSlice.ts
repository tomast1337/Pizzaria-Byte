import axios from "axios";
import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../store";

import { conferirEmail } from "./util";

const LoginSlice = createSlice({
    name: "login",
    initialState: {
        email : "",
        senha : "",
        error: "",
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
            console.log(state.email);
            if(!conferirEmail(action.payload)){
                state.error = "Email inválido";
            }else{
                state.error = "";
            }
        },
        setSenha: (state, action) => {
            state.senha = action.payload;
        },
    },
});

export const {
    setEmail,
    setSenha,
} = LoginSlice.actions;


export const selectEmail = (state: RootState) => state.login.email;
export const selectSenha = (state: RootState) => state.login.senha;
export const selectError = (state: RootState) => state.login.error;

export default LoginSlice.reducer;