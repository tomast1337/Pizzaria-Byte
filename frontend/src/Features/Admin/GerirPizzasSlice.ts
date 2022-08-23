import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BACKEND_URL } from '../../variables';

export interface PizzaData {
    _idSelecionado: string;
    nome: string;
    preco: number;
    imagem: File;
    descricao: string;
}

const GerirPizzasSlice = createSlice({
    name: 'gerirPizzas',
    initialState: {
        isEditando: false,
        _idSelecionado: '',
        erro: '',
        nome: '',
        preco: 1,
        imagem: '',
        descricao: '',
    },
    reducers: {
        setidSelecionado: (state, action) => {
            state._idSelecionado = action.payload;
        },
        setNome: (state, action) => {
            state.nome = action.payload;
        },
        setPreco: (state, action) => {
            state.preco = action.payload;
        },
        setImagem: (state, action) => {
            state.imagem = action.payload;
        },
        setDescricao: (state, action) => {
            state.descricao = action.payload;
        },
        setErro: (state, action) => {
            state.erro = action.payload;
        }
    }
});

export const {
    setNome,
    setPreco,
    setImagem,
    setDescricao,
    setidSelecionado,
    setErro
} = GerirPizzasSlice.actions;

export const SelectErro = (state: RootState) => state.gerirPizzas.erro;
export const SelectIdSelecionado = (state: RootState) =>
    state.gerirPizzas._idSelecionado;
export const SelectNome = (state: RootState) => state.gerirPizzas.nome;
export const SelectPreco = (state: RootState) => state.gerirPizzas.preco;
export const SelectImagem = (state: RootState) =>
    state.gerirPizzas.imagem;
export const SelectDescricao = (state: RootState) =>
    state.gerirPizzas.descricao;

export default GerirPizzasSlice.reducer;
