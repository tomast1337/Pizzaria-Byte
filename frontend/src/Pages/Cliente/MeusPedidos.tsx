import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Menu.module.scss";
import stylesBase from "./clienteBase.module.scss";
import MenuNav from "../../Components/Cliente/MenuNav";

const MeusPedidos = () => {
    const pizzas = {};
    const pizzasPopulares = {};
    const produtos = {};

    return (
        <>
            <MenuNav />
            <div className={stylesBase.page}>
                <div className={stylesBase.container}>
                    <h1>Meus Pedidos</h1>
                </div>
            </div>
        </>
    )
}

export default MeusPedidos;