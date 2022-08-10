import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { conferirEmail } from './util';
import { BACKEND_URL } from '../../variables';

export interface LoginData {
    email: string;
    senha: string;
}

export const logar = createAsyncThunk<
    LoginData,
    LoginData,
    {
        rejectValue: LoginData;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('login/logar', async (data: LoginData, { rejectWithValue }: any) => {
    // checar se algum campo está vazio
    if (data.email === '' || data.senha === '') {
        rejectWithValue('Preencha todos os campos');
        return;
    }
    try {
        const response = await axios.post(`${BACKEND_URL}login`, {
            email: data.email,
            password: data.senha
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(`${error.response.data.error}`);
        } else if (error.request) {
            return rejectWithValue('Erro ao se conectar ao servidor');
        } else {
            console.log(error);
            return rejectWithValue('Erro desconhecido');
        }
    }
});

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        email: '',
        senha: '',
        error: ''
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
            if (!conferirEmail(action.payload)) {
                state.error = 'Email inválido';
            } else {
                state.error = '';
            }
        },
        setSenha: (state, action) => {
            state.senha = action.payload;
            state.error = '';
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: {
        [logar.fulfilled]: (state, action: PayloadAction<LoginData>) => {
            localStorage.setItem('token', action.payload.token);
            state.email = '';
            state.senha = '';
        },
        [logar.rejected]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        [logar.pending]: (state) => {
            state.error = 'Carregando...';
        }
    }
});

export const { setEmail, setSenha, setError } = LoginSlice.actions;

export const selectEmail = (state: RootState) => state.login.email;
export const selectSenha = (state: RootState) => state.login.senha;
export const selectError = (state: RootState) => state.login.error;

export default LoginSlice.reducer;
