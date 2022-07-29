import mongoose from 'mongoose';

import ingredientesSchema from "./ingredientes";
import pedidosSchema from "./pedidos";
import pizzasSchema from "./pizzas";
import produtosSchema from "./produtos";
import usuariosSchema from "./usuarios";

const ingredientes = mongoose.model('ingredientes', ingredientesSchema);
const pedidos = mongoose.model('pedidos', pedidosSchema);
const pizzas = mongoose.model('pizzas', pizzasSchema);
const produtos = mongoose.model('produtos', produtosSchema);
const usuarios = mongoose.model('usuarios', usuariosSchema);

export {
    ingredientes,
    pedidos,
    pizzas,
    produtos,
    usuarios
}
export default {
    ingredientes,
    pedidos,
    pizzas,
    produtos,
    usuarios
}
