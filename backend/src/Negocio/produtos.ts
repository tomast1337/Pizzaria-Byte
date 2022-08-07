import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const produtosSchema: Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    }
});

export default produtosSchema;
