import mongoose, { Schema } from 'mongoose';

export enum UserTypes {
    admin = 'admin',
    user = 'user',
    cozinheiro = 'cozinheiro',
    entregador = 'entregador'
}

const usuariosSchema: Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(UserTypes).filter((type) => isNaN(Number(type))),
        default: 'user'
    }
});

export default usuariosSchema;
