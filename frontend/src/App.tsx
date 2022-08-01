import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuCliente from "./Pages/Cliente/Menu";
import { store } from "./Features/store";
import CriarContaPage from "./Pages/CriarContaPage";
import LoingPage from "./Pages/LoginPage";

export default () => {
    return (
        <Provider store={store}>
            <BrowserRouter basename={"/"}>
                <Routes>
                    {/*Login
                    /
                    /criar-conta
                    */}
                    <Route path="/" element={<LoingPage />} />
                    <Route path="/criar-conta" element={<CriarContaPage />} />
                    {/*Cliente
                        /cliente/menu
                        /cliente/criar-pizza
                        /cliente/meus-pedidos
                        /cliente/carrinho
                    */}
                    <Route path="/cliente/menu" element={<MenuCliente />} />
                    <Route path="/cliente/criar-pizza" element={<LoingPage />} />
                    <Route path="/cliente/meus-pedidos" element={<LoingPage />} />
                    <Route path="/cliente/carrinho" element={<LoingPage />} />

                    {/*Admin*/}

                    {/*Cozinheiro*/}

                    {/*Entregador*/}
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
