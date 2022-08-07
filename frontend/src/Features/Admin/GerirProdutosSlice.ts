import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BACKEND_URL } from '../../variables';

export interface ProdutoData {
    _idSelecionado: string;
    nome: string;
    descricao: string;
    imagem: File;
    preco: number;
}

export const submit = createAsyncThunk<
    ProdutoData,
    ProdutoData,
    {
        rejectValue: ProdutoData;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('gerirProdutos/submit', async (data: ProdutoData, { rejectWithValue }: any) => {
    // checar se algum campo está vazio
    if (
        data.nome === '' ||
        data.descricao === '' ||
        data.imagem === '' ||
        data.preco === ''
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
        fromData.append('descricao', data.descricao);
        fromData.append('preco', data.preco.toString());

        const token = localStorage.getItem('token') || '';

        const response = await axios.post(
            `${BACKEND_URL}admin/produto`,
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
            rejectWithValue(error.response.data);
        } else {
            rejectWithValue('Erro de conexão');
        }
    }
});

export const deleteProduto = createAsyncThunk<
    string,
    string,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('gerirProdutos/delete', async (id: string, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem('token') || '';
        const response = await axios({
            method: 'delete',
            url: `${BACKEND_URL}admin/del/produto/${id}`,
            headers: {
                'x-auth-token': token
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            rejectWithValue(error.response.data);
        } else if (error.request) {
            rejectWithValue('Erro no servidor');
        } else {
            rejectWithValue('Erro desconhecido');
        }
    }
});

const GerirProdutosSlice = createSlice({
    name: 'gerirProdutos',
    initialState: {
        _idSelecionado: '',
        nome: '',
        descricao: '',
        imagem: '',
        preco: 5,
        erro: '',
    },
    reducers: {
        setidSelecionado: (state, action) => {
            state._idSelecionado = action.payload;
        },
        setNome: (state, action) => {
            state.nome = action.payload;
        },
        setDescricao: (state, action) => {
            state.descricao = action.payload;
        },
        setImagem: (state, action) => {
            state.imagem = action.payload;
        },
        setPreco: (state, action) => {
            state.preco = action.payload;
        },
        setErro: (state, action) => {
            state.erro = action.payload;
        }
    },
    extraReducers: {
        [submit.fulfilled]: (state, action: PayloadAction<ProdutoData>) => {
            state.erro = 'Produto Adicionado/Alterado com sucesso';
        },
        [submit.pending]: (state, action: PayloadAction<ProdutoData>) => {
            state.erro = 'Carregando...';
        },
        [submit.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        },
        [deleteProduto.fulfilled]: (state, action: PayloadAction<string>) => {
            state._idSelecionado = '';
            state.nome = '';
            state.descricao = '';
            state.imagem = '';
            state.preco = 5;
            state.erro = 'Produto removido com sucesso';
        },
        [deleteProduto.pending]: (state, action: PayloadAction<string>) => {
            state.erro = 'Excluindo...';
        },
        [deleteProduto.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = "Erro ao remover produto";
        }
    }
});

export const {
    setidSelecionado,
    setNome,
    setDescricao,
    setImagem,
    setPreco,
    setErro
} = GerirProdutosSlice.actions;

export const selectIdSelecionado = (state:RootState) => state.gerirProdutos._idSelecionado;
export const selectNome = (state:RootState) => state.gerirProdutos.nome;
export const selectDescricao = (state:RootState) => state.gerirProdutos.descricao;
export const selectImagem = (state:RootState) => state.gerirProdutos.imagem;
export const selectPreco = (state:RootState) => state.gerirProdutos.preco;
export const selectErro = (state:RootState) => state.gerirProdutos.erro;

export default GerirProdutosSlice.reducer;