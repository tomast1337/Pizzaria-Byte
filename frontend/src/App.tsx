import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CriarContaPage from "./Pages/CriarContaPage";
import LoingPage from "./Pages/LoginPage";

export default () => {
    return (
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
    );
}
