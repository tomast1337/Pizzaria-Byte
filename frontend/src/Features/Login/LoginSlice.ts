import axios from "axios";
import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../store";

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


export const selectEmail = (state: RootState) => state.criarConta.email;
export const selectSenha = (state: RootState) => state.criarConta.senha;
export const selectError = (state: RootState) => state.criarConta.error;

export default LoginSlice.reducer;