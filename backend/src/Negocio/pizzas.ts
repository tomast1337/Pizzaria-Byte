import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const pizzasSchema: Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    imagem: {
        type: String,
        required: true,
    },
    ingredientes: {
        type: Array,
        required: true,
    }
});

export default pizzasSchema;