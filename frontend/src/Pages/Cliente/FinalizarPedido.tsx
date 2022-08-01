import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Menu.module.scss";
import stylesBase from "./FinalizarPedido.module.scss";
import MenuNav from "../../Components/Cliente/MenuNav";

const FinalizarPedido = () => {
    const pizzas = {};
    const pizzasPopulares = {};
    const produtos = {};

    return (
        <>
            <MenuNav />
            <div className={stylesBase.container}>
            </div>
        </>
    )
}

export default FinalizarPedido;