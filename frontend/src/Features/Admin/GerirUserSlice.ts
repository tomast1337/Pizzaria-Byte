import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BACKEND_URL } from '../../variables';
import { conferirEmail } from '../Login/util';

export enum UserTypeEnum {
    admin = 'admin',
    user = 'user',
    cozinheiro = 'cozinheiro',
    entregador = 'entregador'
}

export type UserType = {
    _id: string;
    email: string;
    nome: string;
    type: string;
};

export type PedidoType = {
    _id: string;
    email: string;
    dataHora: number;
    status: string;
    enderco: string;
    carrinho: Array<any>;
};

export const fetchUserInfo = createAsyncThunk<
    UserType,
    string,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('gerirUsers/fetchUserInfo', async (email, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem('token') || '';
        const response = await axios.get(`${BACKEND_URL}admin/user/${email}`, {
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
        }
    }
});

export const fetchUserPedidos = createAsyncThunk<
    PedidoType[],
    string,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('gerirUsers/fetchUserPedidos', async (email, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem('token') || '';
        const response = await axios.get(
            `${BACKEND_URL}admin/pedidos/${email}`,
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
        }
    }
});

export type UserData = {
    idSelecionado: string;
    alterarSenha: string;
    userType: string;
};

export const submitUser = createAsyncThunk<
    UserType,
    UserData,
    {
        rejectValue: string;
        extra: {
            setErro: (erro: string) => void;
        };
    }
>('gerirUsers/submitUser', async (userData, { rejectWithValue }: any) => {
    try {
        const token = localStorage.getItem('token') || '';
        const response = await axios.put(
            `${BACKEND_URL}admin/user/${userData.idSelecionado}`,
            {
                alterarSenha: userData.alterarSenha,
                userType: userData.userType
            },
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
        }
    }
});

const GerirUserSlice = createSlice({
    name: 'gerirUsers',
    initialState: {
        emailSelecionado: '' as string,
        idSelecionado: '' as string,
        nomeSelecionado: '' as string,
        erro: '' as string,
        erroEmail: '' as string,
        pedidos: [] as PedidoType[],
        /* Alterar senha */
        alterarSenha: '' as string,
        userType: '' as UserTypeEnum
    },
    reducers: {
        setUserType: (state, action) => {
            state.emailSelecionado = action.payload;
        },
        setAlterarSenha: (state, action) => {
            state.emailSelecionado = action.payload;
        },
        setEmailSelecionado: (state, action) => {
            state.emailSelecionado = action.payload;
            if (conferirEmail(state.emailSelecionado)) {
                state.erroEmail = '';
            } else {
                state.erroEmail = 'Email inválido';
            }
        }
    },
    extraReducers: {
        [submitUser.fulfilled]: (state, action: PayloadAction<string>) => {
            state.erro = 'Usuário alterado com sucesso';
        },
        [submitUser.pending]: (state) => {
            state.erro = 'Carregando...';
        },
        [submitUser.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        },
        [fetchUserPedidos.fulfilled]: (
            state,
            action: PayloadAction<PedidoType[]>
        ) => {
            state.pedidos = action.payload;
        },
        [fetchUserPedidos.pending]: (state) => {
            state.erroEmail = 'Carregando...';
        },
        [fetchUserPedidos.rejected]: (state, action: PayloadAction<string>) => {
            state.erroEmail = action.payload;
        },
        [fetchUserInfo.fulfilled]: (state, action: PayloadAction<UserType>) => {
            state.idSelecionado = action.payload._id;
            state.nomeSelecionado = action.payload.nome;
            state.userType = action.payload.type;
        },
        [fetchUserInfo.pending]: (state) => {},
        [fetchUserInfo.rejected]: (state, action: PayloadAction<string>) => {
            state.erro = action.payload;
        }
    }
});

export const { setUserType, setAlterarSenha, setEmailSelecionado } =
    GerirUserSlice.actions;

export const selectEmailSelecionado = (state: RootState) =>
    state.gerirUsers.emailSelecionado;
export const selectIdSelecionado = (state: RootState) =>
    state.gerirUsers.idSelecionado;
export const selectNomeSelecionado = (state: RootState) =>
    state.gerirUsers.nomeSelecionado;
export const selectAlterarSenha = (state: RootState) =>
    state.gerirUsers.alterarSenha;
export const selectUserType = (state: RootState) => state.gerirUsers.userType;
export const selectErro = (state: RootState) => state.gerirUsers.erro;
export const selectErroEmail = (state: RootState) => state.gerirUsers.erroEmail;
export const selectPedidos = (state: RootState) => state.gerirUsers.pedidos;

export default GerirUserSlice.reducer;
