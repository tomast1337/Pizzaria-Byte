import mongoose, { Schema } from 'mongoose';

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
        enum: ['admin', 'user', 'cozinheiro', 'entregador'],
        default: 'user'
    }
});

export default usuariosSchema;
