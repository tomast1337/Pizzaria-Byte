import axios from "axios";
import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { conferirEmail } from "./util";
import { BACKEND_URL } from "../../variables";

export interface criarContaData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
}

export const criarContaFetch = createAsyncThunk<
    criarContaData,
    criarContaData,
    {
        rejectValue: criarContaData;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>(
    "criarConta/criarContaFetch",
    async (data: criarContaData, { rejectWithValue }: any) => {
        // checar se algum campo está vazio
        if (data.nome === "" || data.email === "" || data.senha === "" || data.confirmarSenha === "") {
            rejectWithValue("Preencha todos os campos");
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/login/register`, 
            {
                nome: data.nome,
                email: data.email,
                password: data.senha,
            });
            return response.data;
        }
        catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                return rejectWithValue(`${error.response.data.error}`);
            }
            else if (error.request) {
                return rejectWithValue("Erro no servidor");
            }
            else {
                return rejectWithValue("Erro desconhecido");
            }
        }
    }
);


const CriarContaSlice = createSlice({
    name: "criarConta",
    initialState: {
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        error: "",
    },
    reducers: {
        setNome: (state, action) => {
            state.nome = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
            if (!conferirEmail(action.payload)) {
                state.error = "Email inválido";
            } else {
                state.error = "";
            }
        },
        setSenha: (state, action) => {
            state.senha = action.payload;
            if (state.senha.length < 6) {
                state.error = "Senha muito curta";
            } else {
                state.error = "";
            }
        },
        setConfirmarSenha: (state, action) => {
            state.confirmarSenha = action.payload;
            if (state.senha !== state.confirmarSenha) {
                state.error = "Senhas não conferem";
            } else {
                state.error = "";
            }
        },
    },
    extraReducers: {
        [criarContaFetch.pending.type]: (state, action) => {
            state.error = "";
        },
        [criarContaFetch.fulfilled.type]: (state, action) => {
            state.error = "";
        },
        [criarContaFetch.rejected.type]: (state, action) => {
            state.error = action.payload;
        },
    }
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