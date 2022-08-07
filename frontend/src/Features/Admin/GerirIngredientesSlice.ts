import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BACKEND_URL } from '../../variables';

export interface IngredienteData {
    _idSelecionado: string;
    nome: string;
    preco: number;
    imagem: File;
    descricao: string;
    pesoPorcao: number;
}

export const submit = createAsyncThunk<
    IngredienteData,
    IngredienteData,
    {
        rejectValue: IngredienteData;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('admin/submit', async (data: IngredienteData, { rejectWithValue }: any) => {
    // checar se algum campo está vazio
    if (
        data.nome === '' ||
        data.preco === '' ||
        data.imagem === '' ||
        data.descricao === '' ||
        data.pesoPorcao === ''
    ) {
        rejectWithValue('Preencha todos os campos');
        return;
    }
    try {
        const fromData = new FormData();
        if (data._idSelecionado !== '')
            fromData.append('_id', data._idSelecionado);
        if (data.imagem) fromData.append('imagem', data.imagem);

        fromData.append('nome', data.nome);
        fromData.append('preco', data.preco.toString());
        fromData.append('descricao', data.descricao);
        fromData.append('pesoPorcao', data.pesoPorcao.toString());

        const token = localStorage.getItem('token') || '';

        const response = await axios.post(
            `${BACKEND_URL}admin/ingrediente`,
            fromData,
            {
                headers: {
                    'x-auth-token': token
                }
            }
        );
        console.log(response);

        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data);
            return rejectWithValue(`${error.response.data.error}`);
        } else if (error.request) {
            return rejectWithValue('Erro no servidor');
        } else {
            return rejectWithValue('Erro desconhecido');
        }
    }
});

const GerirIngredientes = createSlice({
    name: 'gerirIngredientes',
    initialState: {
        isEditando: false,
        _idSelecionado: '',
        erro: '',
        nome: '',
        preco: 4.5,
        imagem: '',
        descricao: '',
        pesoPorcao: 75.4
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
        setPesoPorcao: (state, action) => {
            state.pesoPorcao = action.payload;
        }
    },
    extraReducers: {
        [submit.fulfilled]: (state, action: PayloadAction<IngredienteData>) => {
            state.erro = 'Sucesso';
        },
        [submit.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        },
        [submit.pending]: (state) => {
            state.erro = 'Carregando...';
        }
    }
});

export const {
    setNome,
    setPreco,
    setImagem,
    setDescricao,
    setPesoPorcao,
    setidSelecionado
} = GerirIngredientes.actions;

export const SelectErro = (state: RootState) => state.gerirIngredientes.erro;
export const SelectIdSelecionado = (state: RootState) =>
    state.gerirIngredientes._idSelecionado;
export const SelectNome = (state: RootState) => state.gerirIngredientes.nome;
export const SelectPreco = (state: RootState) => state.gerirIngredientes.preco;
export const SelectImagem = (state: RootState) =>
    state.gerirIngredientes.imagem;
export const SelectDescricao = (state: RootState) =>
    state.gerirIngredientes.descricao;
export const SelectPesoPorcao = (state: RootState) =>
    state.gerirIngredientes.pesoPorcao;

export default GerirIngredientes.reducer;
