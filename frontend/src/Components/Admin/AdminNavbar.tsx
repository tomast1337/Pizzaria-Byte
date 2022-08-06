import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./AdminNavbar.module.scss";

const AdminNavbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
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
                <ul>
                    <li>
                        <Link to="/admin/menu-admin">Menu Admin</Link>
                    </li>
                    <li>
                        <Link to="/admin/gerir-pizzas">Gerir Pizzas</Link>
                    </li>
                    <li>
                        <Link to="/admin/gerir-ingredientes">Gerir Ingredientes</Link>
                    </li>
                    <li>
                        <Link to="/admin/gerir-produtos">Gerir Produtos</Link>
                    </li>
                    <li>
                        <Link to="/admin/gerir-usuarios">Gerir Usuarios</Link>
                    </li>
                    <li>
                        <Link to="/">Logout</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default AdminNavbar;

