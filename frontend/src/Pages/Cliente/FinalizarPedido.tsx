import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Menu.module.scss';
import stylesBase from './FinalizarPedido.module.scss';
import MenuNav from '../../Components/Cliente/MenuNav';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils';

const FinalizarPedido = () => {
    const pizzas = {};
    const pizzasPopulares = {};
    const produtos = {};
    const navigate = useNavigate()
    React.useEffect(() => {
        // set window title
        window.document.title = 'Finalizar Pedido';
        if(!verifyToken()) {
            navigate('/')
        }
    }, []);
    return (
        <>
            <MenuNav />
            <div className={stylesBase.page}>
                <div className={stylesBase.container}>
                    <h1>Finalizar Pedido</h1>
                </div>
            </div>
        </>
    );
};

export default FinalizarPedido;
