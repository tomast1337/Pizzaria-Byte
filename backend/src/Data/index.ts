import mongoose from 'mongoose';
import {
    ingredientes,
    pedidos,
    pizzas,
    produtos,
    usuarios
} from '../Negocio';

const MONGO_URI = 'mongodb://localhost:27017/pizzaria';


// get connection to mongoDB
const getConnection = async (): Promise<mongoose.Connection> => {
    const conn = await mongoose.createConnection(MONGO_URI);
    return conn;
}

export default getConnection;