import axios from "axios";
import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../store";
import { conferirEmail } from "./util";

const CriarContaSlice = createSlice({
    name: "criarConta",
    initialState: {
        nome : "",
        email : "",
        senha : "",
        confirmarSenha : "",
        error: "",
    },
    reducers: {
        setNome: (state, action) => {
            state.nome = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
            if(!conferirEmail(action.payload)){
                state.error = "Email inválido";
            }else{
                state.error = "";
            }
        },
        setSenha: (state, action) => {
            state.senha = action.payload;
            if(state.senha.length < 6){
                state.error = "Senha muito curta";
            }else{
                state.error = "";
            }
        },
        setConfirmarSenha: (state, action) => {
            state.confirmarSenha = action.payload;
            if(state.senha !== state.confirmarSenha){
                state.error = "Senhas não conferem";
            }else{
                state.error = "";
            }
        },
    },
});

export const {
    setNome,
    setEmail,
    setSenha,
    setConfirmarSenha,
} = CriarContaSlice.actions;


export const selectNome = (state: RootState) => state.criarConta.nome;
export const selectEmail = (state: RootState) => state.criarConta.email;
export const selectSenha = (state: RootState) => state.criarConta.senha;
export const selectConfirmarSenha = (state: RootState) => state.criarConta.confirmarSenha;
export const selectError = (state: RootState) => state.criarConta.error;

export default CriarContaSlice.reducer;