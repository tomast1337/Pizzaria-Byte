import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BACKEND_URL } from "../../variables";

export interface ingredienteData {
    nome: string;
    preco: number;
    imagem: string;
    descricao: string;
    pesoPorcao: number;
}

const GerirIngredientes = createSlice({
    name: "gerirIngredientes",
    initialState: {
        isEditando: false,
        carregando: true,
        ingredientes: [],
        erro: "",
        nome: "",
        preco: 4.50,
        imagem: "",
        descricao: "",
        pesoPorcao: 75.40,
    },
    reducers: {
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
        setPesoPorcao: (state, action) => {
            state.pesoPorcao = action.payload;
        },
    },
});

export const {
    setNome,
    setPreco,
    setImagem,
    setDescricao,
    setPesoPorcao,
} = GerirIngredientes.actions;


export const SelectCarregando = (state: RootState) => state.gerirIngredientes.carregando;
export const SelectErro = (state: RootState) => state.gerirIngredientes.erro;
export const SelectIngredientes = (state: RootState) => state.gerirIngredientes.ingredientes;
export const SelectNome = (state: RootState) => state.gerirIngredientes.nome;
export const SelectPreco = (state: RootState) => state.gerirIngredientes.preco;
export const SelectImagem = (state: RootState) => state.gerirIngredientes.imagem;
export const SelectDescricao = (state: RootState) => state.gerirIngredientes.descricao;
export const SelectPesoPorcao = (state: RootState) => state.gerirIngredientes.pesoPorcao;

export default GerirIngredientes.reducer;