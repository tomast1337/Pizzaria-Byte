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
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(`${error.response.data.error}`);
        } else if (error.request) {
            return rejectWithValue('Erro no servidor');
        } else {
            return rejectWithValue('Erro desconhecido');
        }
    }
});

export const deleteIngrediente = createAsyncThunk<
    string,
    string,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('admin/deleteIngrediente', async (id: string, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem('token') || '';
        const response = await axios({
            method: 'delete',
            url: `${BACKEND_URL}admin/del/ingrediente/${id}`,
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
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
        preco: 1,
        imagem: '',
        descricao: '',
        pesoPorcao: 10
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
        },
        setErro: (state, action) => {
            state.erro = action.payload;
        }
    },
    extraReducers: {
        [submit.fulfilled]: (state, action: PayloadAction<IngredienteData>) => {
            state.erro = 'Ingrediente Adicionado/Alterado com sucesso';
        },
        [submit.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        },
        [submit.pending]: (state) => {
            state.erro = 'Carregando...';
        },
        [deleteIngrediente.fulfilled]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.erro = 'Ingrediente removido com sucesso';
            state._idSelecionado = '';
            state.erro = '';
            state.nome = '';
            state.preco = 1;
            state.imagem = '';
            state.descricao = '';
            state.pesoPorcao = 10;
        },
        [deleteIngrediente.rejected]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.erro = 'Erro ao remover ingrediente';
        },
        [deleteIngrediente.pending]: (state) => {
            state.erro = 'Excluindo...';
        }
    }
});

export const {
    setNome,
    setPreco,
    setImagem,
    setDescricao,
    setPesoPorcao,
    setidSelecionado,
    setErro
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
