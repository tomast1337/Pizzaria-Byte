import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./MenuNav.module.scss";

const MenuNav = () => {
    const QuantidadeItensCarrinho = 5;

    const [isOpen, setIsOpen] = React.useState(true);
    const menuToggle = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className={styles.menuBar}>
                <div className={styles.logo}>
                    <h1>Pizzaria ON</h1>
                </div>
                <div className={styles.menuButton}>
                    <button onClick={menuToggle}>
                        <div className={styles.menuToggleLine}></div>
                        <div className={styles.menuToggleLine}></div>
                        <div className={styles.menuToggleLine}></div>
                    </button>
                </div>
            </nav>
            <div className={styles.menu}
                style={{
                    transform: isOpen ? "translateX(0)" : "translateX(98%)"
                }}>
                <ul >
                    <li>
                        <Link to="/">Menu</Link>
                    </li>
                    <li>
                        <Link to="/">Criar Pizza</Link>
                    </li>
                    <li>
                        <Link to="/">Meus Pedidos</Link>
                    </li>
                    <li>
                        <Link to="/">
                            Carrinho
                            {
                                QuantidadeItensCarrinho > 0 ?
                                    <span 
                                    className={styles.quantidadeItensCarrinho}>
                                        {QuantidadeItensCarrinho} {
                                            QuantidadeItensCarrinho > 1 ?
                                                "itens" : "item"
                                        }
                                        </span>
                                         :
                                    null

                            }
                        </Link>
                    </li>
                    <li>
                        <Link to="/">Sair</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default MenuNav;