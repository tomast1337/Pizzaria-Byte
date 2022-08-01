import mongoose, { connect, Mongoose } from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();



const MONGO_URI: string | null = process.env.MONGODB_URI || null;

// get connection to mongoDB
const getConnection = async () => {
    if (MONGO_URI === null)
        throw new Error('MONGO_URI is not defined in .env');
    await connect(MONGO_URI);
}

export default getConnection;