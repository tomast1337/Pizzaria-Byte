import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MinhaConta.module.scss";
import stylesBase from "./clienteBase.module.scss";
import MenuNav from "../../Components/Cliente/MenuNav";

const MinhaConta = () => {
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

export default MinhaConta;