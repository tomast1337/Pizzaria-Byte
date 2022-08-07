import LoginRoutes from './login';
import AdminRoutes from './admin';
import ClienteRoutes from './cliente';
import CozinheiroRoutes from './cozinheiro';
import EntregadorRoutes from './entregador';
import CarrinhoRoutes from './carrinho';

import express from 'express';

import {
    isLogged,
    isAdmin,
    isCliente,
    isCozinheiro,
    isEntregador

} from '../Middlewares/auth';

const router: express.Router = express.Router();

/*
---Login---
/api/login
/api/login/register
*/
router.use('/login', LoginRoutes);

/*
---Admin---
/api/admin/user/:email 
/api/admin/pedidos/:email
/api/admin/promover/:email

/api/admin/ingrediente
/api/admin/pizza
/api/admin/produto

/api/del/admin/user/:email
/api/del/admin/ingrediente/:id
/api/del/admin/pizza/:id
/api/del/admin/produto/:id

/api/admin/relatorio/:dataInicio/:dataFim
*/
router.use('/admin', [isLogged, isAdmin], AdminRoutes);

/*
---Cliente---

/api/cliente/ingredientes
/api/cliente/pizzas
/api/cliente/produtos

/api/cliente/pedidos/:token
/api/cliente/carrinho/:token
/api/cliente/pedido/:token/:id
/api/cliente/carrinho/:token/:id
*/
router.use('/cliente', [isLogged], ClienteRoutes);

/*
---Carrinho---
 

*/
router.use('/Carrinho', [isLogged, isCliente], CarrinhoRoutes);

/*
---Cozinheiro---
 

*/
router.use('/cozinheiro', [isLogged, isCozinheiro], CozinheiroRoutes);

/*
---Entregador---
 

*/
router.use('/entregador', [isLogged, isEntregador], EntregadorRoutes);

export default router;