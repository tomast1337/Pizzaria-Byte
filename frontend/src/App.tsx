import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuCliente from "./Pages/Cliente/Menu";
import { store } from "./Features/store";
import CriarContaPage from "./Pages/CriarContaPage";
import LoingPage from "./Pages/LoginPage";
import CriarPizza from "./Pages/Cliente/CriarPizza";
import Carrinho from "./Pages/Cliente/Carrinho";
import MeusPedidos from "./Pages/Cliente/MeusPedidos";
import MinhaConta from "./Pages/Cliente/MinhaConta";
import FinalizarPedido from "./Pages/Cliente/FinalizarPedido";

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
                    <Route path="/cliente/criar-pizza" element={<CriarPizza />} />
                    <Route path="/cliente/meus-pedidos" element={<MeusPedidos />} />
                    <Route path="/cliente/carrinho" element={<Carrinho />} />
                    <Route path="/cliente/minha-conta" element={<MinhaConta />} />
                    <Route path="/cliente/finalizar-pedido" element={<FinalizarPedido />} />

                    {/*Admin*/}

                    {/*Cozinheiro*/}

                    {/*Entregador*/}
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
