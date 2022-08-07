import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuCliente from './Pages/Cliente/Menu';
import { store } from './Features/store';

/* Login */
import CriarContaPage from './Pages/CriarContaPage';
import LoingPage from './Pages/LoginPage';

/* Cliente */
import CriarPizza from './Pages/Cliente/CriarPizza';
import Carrinho from './Pages/Cliente/Carrinho';
import MeusPedidos from './Pages/Cliente/MeusPedidos';
import MinhaConta from './Pages/Cliente/MinhaConta';
import FinalizarPedido from './Pages/Cliente/FinalizarPedido';

/* Admin */
import MenuAdminPage from './Pages/Admin/MenuAdminPage';
import GerirPizzasPage from './Pages/Admin/GerirPizzasPage';
import GerirIngredientesPage from './Pages/Admin/GerirIngredientesPage';
import GerirProdutosPage from './Pages/Admin/GerirProdutosPage';
import GerirUserPage from './Pages/Admin/GerirUserPage';

export default () => {
    const [token, setToken] = React.useState(null);
    const [userType, setUserType] = React.useState('');

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            const user = JSON.parse(atob(token.split('.')[1]));
            setUserType(user.type);
        }
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter basename={'/'}>
                <Routes>
                    {/*Login
                    /
                    /criar-conta
                    */}
                    <Route path="/" element={<LoingPage />} />
                    <Route path="/criar-conta" element={<CriarContaPage />} />
                    {/*Cliente
                        /cliente/menu
                        /cliente/criar-pizza
                        /cliente/meus-pedidos
                        /cliente/carrinho
                        /cliente/minha-conta
                        /cliente/finalizar-pedido
                    */}

                    <Route path="/cliente/menu" element={<MenuCliente />} />
                    <Route
                        path="/cliente/criar-pizza"
                        element={<CriarPizza />}
                    />
                    <Route
                        path="/cliente/meus-pedidos"
                        element={<MeusPedidos />}
                    />
                    <Route path="/cliente/carrinho" element={<Carrinho />} />
                    <Route
                        path="/cliente/minha-conta"
                        element={<MinhaConta />}
                    />
                    <Route
                        path="/cliente/finalizar-pedido"
                        element={<FinalizarPedido />}
                    />

                    {/*Admin*
                        /admin/menu-admin
                        /admin/gerir-pizzas
                        /admin/gerir-ingredientes
                        /admin/gerir-produtos
                        /admin/gerir-usuarios
                    */}

                    <Route path="/admin/menu" element={<MenuAdminPage />} />
                    <Route
                        path="/admin/gerir-pizzas"
                        element={<GerirPizzasPage />}
                    />
                    <Route
                        path="/admin/gerir-ingredientes"
                        element={<GerirIngredientesPage />}
                    />
                    <Route
                        path="/admin/gerir-produtos"
                        element={<GerirProdutosPage />}
                    />
                    <Route
                        path="/admin/gerir-usuarios"
                        element={<GerirUserPage />}
                    />

                    {/*Cozinheiro*/}

                    {/*Entregador*/}

                    {/* 404 */}
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};
