import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Menu.module.scss";
import stylesBase from "./CriarPizza.module.scss";
import MenuNav from "../../Components/Cliente/MenuNav";

const CriarPizza = () => {
    const pizzas = {};
    const pizzasPopulares = {};
    const produtos = {};

    return (
        <>
            <MenuNav />
            <div className={stylesBase.page}>
                <div className={stylesBase.container}>
                </div>
            </div>
        </>
    )
}

export default CriarPizza;