import { configureStore } from '@reduxjs/toolkit';
import CriarContaSlice from './Login/CriarContaSlice';
import LoginSlice from './Login/LoginSlice';
import GerirIngredientesSlice from './Admin/GerirIngredientesSlice';
import CommonSlice from './CommonSlice';
import GerirProdutosSlice from './Admin/GerirProdutosSlice';
import GerirUserSlice from './Admin/GerirUserSlice';
import metadesPizzaSlice  from './Pizza/MetadesPizzaSlice';
import GerirPizzasSlice from './Admin/GerirPizzasSlice';

export const store = configureStore({
    reducer: {
        // MetadesPizza
        metadesPizza: metadesPizzaSlice,
        // Login / Criar Conta
        criarConta: CriarContaSlice,
        login: LoginSlice,

        // Common
        common: CommonSlice,

        // Cliente

        // Admin
        gerirIngredientes: GerirIngredientesSlice,
        gerirProdutos: GerirProdutosSlice,
        gerirUsers: GerirUserSlice,
        gerirPizzas:GerirPizzasSlice
        // Cozinheiro

        // Entregador

        
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
