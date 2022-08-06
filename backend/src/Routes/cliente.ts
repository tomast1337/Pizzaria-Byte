import express from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();
import {
    ingredientes,
    pedidos,
    pizzas,
    produtos,
    usuarios
} from '../Negocio';
const router: express.Router = express.Router();

// Rota para pegar todos os ingredientes
router.get('/ingredientes', async (req: any, res: any) => {
    const ingredientesLista = await ingredientes.find();
    res.status(200).json(ingredientesLista);

});

// Rota para pegar todos as pizzas
router.get('/pizzas', async (req: any, res: any) => {
    const pizzasLista = await pizzas.find();
    res.status(200).json(pizzasLista);
});

// Rota para pegar todos os produtos
router.get('/produtos', async (req: any, res: any) => {
    const produtosLista = await produtos.find();
    res.status(200).json(produtosLista);
});

// Rota para pegar todos os pedidos de um token
router.get('/pedidos/:token', async (req: any, res: any) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const pedidosLista = await pedidos.find({ email: decoded.email });
    res.status(200).json(pedidosLista);
});


export default router;