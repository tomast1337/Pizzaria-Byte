import { configureStore } from "@reduxjs/toolkit";
import CriarContaSlice from "./Login/CriarContaSlice";
import LoginSlice from "./Login/LoginSlice";
import GerirIngredientesSlice from "./Admin/GerirIngredientesSlice";

export const store = configureStore({
    reducer: {
        // Login / Criar Conta
        criarConta: CriarContaSlice,
        login: LoginSlice,
        
        // Cliente
        

        // Admin
        gerirIngredientes: GerirIngredientesSlice,
        
        // Cozinheiro

        // Entregador

    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

