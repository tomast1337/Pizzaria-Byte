import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Carrinho.module.scss';
import stylesBase from './clienteBase.module.scss';
import MenuNav from '../../Components/Cliente/MenuNav';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils';

const Carrinho = () => {
    const pizzas = {};
    const pizzasPopulares = {};
    const produtos = {};
    const navigate = useNavigate()
    React.useEffect(() => {
        // set window title
        window.document.title = 'Carrinho';
        if(!verifyToken()) {
            navigate('/')
        }
    }, []);
    return (
        <>
            <MenuNav />
            <div className={stylesBase.page}>
                <div className={stylesBase.container}>
                    <h1>Carrinho</h1>
                </div>
                <div className={stylesBase.container}>
                    <h2>Itens</h2>
                    <div className={stylesBase.container}></div>
                </div>
            </div>
        </>
    );
};

export default Carrinho;
