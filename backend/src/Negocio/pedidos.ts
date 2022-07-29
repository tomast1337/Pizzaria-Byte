import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const pedidosSchema: Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    email: {
        type: String,
        required: true,
    },
    dataHora: { // unix timestamp
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    enderco: {
        type: String,
        required: true,
    },
    carrinho: {
        type: Array,
        required: true,
    },
});