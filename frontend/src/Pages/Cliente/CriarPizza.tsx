import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CriarPizza.module.scss";
import stylesBase from "./clienteBase.module.scss";
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
                    <h1>Criar Pizza</h1>
                </div>
                <div className={stylesBase.container}>
                    <h2>Metades</h2>
                    
                </div>
            </div>
        </>
    )
}

export default CriarPizza;