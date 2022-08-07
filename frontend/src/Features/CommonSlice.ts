import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { BACKEND_URL } from '../variables';

export type IngredienteType = {
    _id: string;
    nome: string;
    preco: number;
    imagem: string;
    descricao: string;
    pesoPorcao: number;
};

export type PizzaType = {
    _id: string;
    nome: string;
    descricao: string;
    imagem: string;
    ingredientes: string[];
};

export type ProdutoType = {
    _id: string;
    nome: string;
    descricao: string;
    imagem: string;
    preco: number;
};

export const fetchIngredientes = createAsyncThunk<
    IngredienteType[],
    undefined,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('common/fetchIngredientes', async (_, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem('token') || '';
        const response = await axios.get(`${BACKEND_URL}cliente/ingredientes`, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            return rejectWithValue(`${error.response.data.error}`);
        } else if (error.request) {
            return rejectWithValue('Erro no servidor');
        }
    }
});

export const fetchPizzas = createAsyncThunk<
    PizzaType[],
    undefined,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('common/fetchPizzas', async (_, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem('token') || '';
        const response = await axios.get(`${BACKEND_URL}cliente/pizzas`, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            return rejectWithValue(`${error.response.data.error}`);
        } else if (error.request) {
            return rejectWithValue('Erro no servidor');
        }
    }
});

export const fetchProdutos = createAsyncThunk<
    ProdutoType[],
    undefined,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('common/fetchProdutos', async (_, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem('token') || '';
        const response = await axios.get(`${BACKEND_URL}cliente/produtos`, {
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            return rejectWithValue(`${error.response.data.error}`);
        } else if (error.request) {
            return rejectWithValue('Erro no servidor');
        }
    }
});

const CommonSlice = createSlice({
    name: 'common',
    initialState: {
        ingredientes: [] as IngredienteType[],
        carregandoIngredientes: true,
        pizzas: [] as PizzaType[],
        carregandoPizzas: true,
        produtos: [] as ProdutoType[],
        carregandoProdutos: true,
        erro: '' as string
    },
    reducers: {
        setErro: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        }
    },
    extraReducers: {
        /*------------------------------------fetchIngredientes------------------------------------*/
        [fetchIngredientes.fulfilled]: (
            state,
            action: PayloadAction<IngredienteType[]>
        ) => {
            state.ingredientes = action.payload;
            state.carregandoIngredientes = false;
        },
        [fetchIngredientes.rejected]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.erro = action.payload;
        },
        [fetchIngredientes.pending]: (state) => {
            state.carregandoIngredientes = true;
        },
        /*------------------------------------fetchPizzas------------------------------------*/
        [fetchPizzas.fulfilled]: (
            state,
            action: PayloadAction<PizzaType[]>
        ) => {
            state.pizzas = action.payload;
            state.carregandoPizzas = false;
        },
        [fetchPizzas.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        },
        [fetchPizzas.pending]: (state) => {
            state.carregandoPizzas = true;
        },
        /*------------------------------------fetchProdutos------------------------------------*/
        [fetchProdutos.fulfilled]: (
            state,
            action: PayloadAction<ProdutoType[]>
        ) => {
            state.produtos = action.payload;
            state.carregandoProdutos = false;
        },
        [fetchProdutos.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        },
        [fetchProdutos.pending]: (state) => {
            state.carregandoProdutos = true;
        }
    }
});

export const SelectIngredientes = (state: RootState) =>
    state.common.ingredientes;
export const SelectPizzas = (state: RootState) => state.common.pizzas;
export const SelectProdutos = (state: RootState) => state.common.produtos;

export const SelectCarregandoIngredientes = (state: RootState) => state.common.carregandoIngredientes;
export const SelectCarregandoPizzas = (state: RootState) => state.common.carregandoPizzas;
export const SelectCarregandoProdutos = (state: RootState) => state.common.carregandoProdutos;


export default CommonSlice.reducer;
