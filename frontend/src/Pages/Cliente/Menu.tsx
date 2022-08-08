import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Menu.module.scss';
import stylesBase from './clienteBase.module.scss';
import MenuNav from '../../Components/Cliente/MenuNav';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils';

const Menu = () => {
    const pizzas = {};
    const pizzasPopulares = {};
    const produtos = {};
    const navigate = useNavigate();
    React.useEffect(() => {
        // set window title
        window.document.title = 'Menu';
        if (!verifyToken()) {
            navigate('/');
        }
    }, []);
    return (
        <>
            <MenuNav />
            <div className={stylesBase.page}>
                {/* Pizzas Mais Pedidas */}
                <div className={stylesBase.container}>
                    <h1>Pizzas Mais Pedidas</h1>
                </div>
                {/* Crie sua pizza */}
                <div className={stylesBase.container}>
                    <h1>Crie sua pizza</h1>
                </div>
                {/* Produtos */}
                <div className={stylesBase.container}>
                    <h1>Produtos</h1>
                </div>
                {/* Todas as pizzas */}
                <div className={stylesBase.container}>
                    <h1>Todas as pizzas</h1>
                </div>
            </div>
        </>
    );
};

export default Menu;
