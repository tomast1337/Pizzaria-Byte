import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { BACKEND_URL } from "../variables";

export type ingredienteData = {
    _id: string;
    nome: string;
    preco: number;
    imagem: File;
    descricao: string;
    pesoPorcao: number;
}

export type pizzaData = {
    _id: string;
    nome: string;
    descricao: string;
    imagem: string;
    ingredientes: string[];
}

export type produtoData = {
    _id: string;
    nome: string;
    descricao: string;
    imagem: string;
    preco: number;
}

export const fetchIngredientes = createAsyncThunk<
    ingredienteData[],
    undefined,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>("common/fetchIngredientes", async (_, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem("token") || "";
        const response = await axios.get(`${BACKEND_URL}cliente/ingredientes`, {
            headers: {
                "x-auth-token": token,
            }
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
    }
});

export const fetchPizzas = createAsyncThunk<
    pizzaData[],
    undefined,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>("common/fetchPizzas", async (_, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem("token") || "";
        const response = await axios.get(`${BACKEND_URL}cliente/pizzas`, {
            headers: {
                "x-auth-token": token,
            }
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
    }
});

export const fetchProdutos = createAsyncThunk<
    produtoData[],
    undefined,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>("common/fetchProdutos", async (_, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem("token") || "";
        const response = await axios.get(`${BACKEND_URL}cliente/produtos`, {
            headers: {
                "x-auth-token": token,
            }
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
    }
});

const CommonSlice = createSlice({
    name: "common",
    initialState: {
        ingredientes: [] as ingredienteData[],
        carregandoIngredientes: true,
        pizzas: [] as pizzaData[],
        carregandoPizzas: true,
        produtos: [] as produtoData[],
        carregandoProdutos: true,
        erro: "" as string,
    },
    reducers: {
        setErro: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        }
    },
    extraReducers: {
        /*------------------------------------fetchIngredientes------------------------------------*/
        [fetchIngredientes.fulfilled]: (state, action: PayloadAction<ingredienteData[]>) => {
            state.ingredientes = action.payload;
            state.carregandoIngredientes = false;
        }
        [fetchIngredientes.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        }
        [fetchIngredientes.pending]: (state) => {
            state.carregandoIngredientes = true;
        }
/*------------------------------------fetchPizzas------------------------------------*/
        [fetchPizzas.fulfilled]: (state, action: PayloadAction<pizzaData[]>) => {
            state.pizzas = action.payload;
            state.carregandoPizzas = false;
        }
        [fetchPizzas.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        }
        [fetchPizzas.pending]: (state) => {
            state.carregandoPizzas = true;
        }
/*------------------------------------fetchProdutos------------------------------------*/
        [fetchProdutos.fulfilled]: (state, action: PayloadAction<produtoData[]>) => {
            state.produtos = action.payload;
            state.carregandoProdutos = false;
        }
        [fetchProdutos.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        }
        [fetchProdutos.pending]: (state) => {
            state.carregandoProdutos = true;
        }
    }
});


export const selectIngredientes = (state: RootState) => state.common.ingredientes;
export const selectPizzas = (state: RootState) => state.common.pizzas;
export const selectProdutos = (state: RootState) => state.common.produtos;

export default CommonSlice.reducer;