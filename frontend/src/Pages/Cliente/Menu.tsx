import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Menu.module.scss';
import stylesBase from './clienteBase.module.scss';
import MenuNav from '../../Components/Cliente/MenuNav';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils';
import {
    fetchProdutos,
    PizzaType,
    ProdutoType,
    SelectProdutos
} from '../../Features/CommonSlice';
import { BACKEND_URL_NO_API } from '../../variables';

const ProdutoCard = (prop: ProdutoType) => {
    const noCarrinho = false;
    return (
        <div className={styles.produtoCard}>
            <div className={styles.produtoCardImg}>
                <img src={
                    BACKEND_URL_NO_API +
                    prop.imagem.substring(1, prop.imagem.length)
                } alt={prop.nome} />
            </div>
            <div className={styles.produtoCardInfo}>
                <h2>{prop.nome}</h2>
                <p>{prop.descricao}</p>
                <p>R${prop.preco.toFixed(2)}</p>
            </div>
            <div className={styles.produtoCardBtn}>
                <button
                    disabled={noCarrinho}
                >
                    {!noCarrinho ? 'Adicionar ao Carrinho' : 'No Carrinho'}
                </button>
            </div>
        </div>
    );
}

const Menu = () => {
    const dispatcher = useDispatch();
    const pizzas = {};
    const pizzasPopulares = {};
    const produtos = useSelector(SelectProdutos);

    const navigate = useNavigate();
    React.useEffect(() => {
        // set window title
        window.document.title = 'Menu';
        if (!verifyToken()) {
            navigate('/');
        }
        dispatcher(fetchProdutos());
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
                    <div className={stylesBase.list}>
                        {
                        produtos.map((produto: ProdutoType) => {
                            return <ProdutoCard key={produto.id} {...produto} />;
                        }
                        )}
                    </div>
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
