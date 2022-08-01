import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Menu.module.scss";
import stylesBase from "./clienteBase.module.scss";
import MenuNav from "../../Components/Cliente/MenuNav";

const Menu = () => {
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

export default Menu;