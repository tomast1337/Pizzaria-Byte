import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./Features/store";
import CriarContaPage from "./Pages/CriarContaPage";
import LoingPage from "./Pages/LoginPage";

export default () => {
    return (
        <Provider store={store}>
            <BrowserRouter basename={"/"}>
            <Routes>
                {/*Login*/}
                <Route path="/" element={<LoingPage />} />
                <Route path="/criar-conta" element={<CriarContaPage />} />
                {/*Cliente*/}

                {/*Admin*/}

                {/*Cozinheiro*/}

                {/*Entregador*/}
            </Routes>
        </BrowserRouter>
        </Provider>
    );
}
