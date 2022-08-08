import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BACKEND_URL } from '../../variables';


const GerirUserSlice = createSlice({
    name:"gerirProdutos",
    initialState:{
        emailSelecionado:""
    },
    reducers: {

    }
});

export default GerirUserSlice.reducer;