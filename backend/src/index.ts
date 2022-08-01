import express from 'express';
import rotas from './Routes';
import cors from 'cors';
import * as dotenv from "dotenv";
import getConnection from './DataBase';

const main = async () => {
    dotenv.config();
    const PORT: string = "3000" || process.env.PORT;
    const server: express.Application = express();

    try {
        await getConnection();
        console.log("Banco de dados conectado com sucesso");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    // Cors middleware
    server.use(cors());

    // application/json middleware
    server.use(express.json());

    //rotas 
    server.use('/', rotas);

    // 404 handler
    server.use((req, res, next) => {
        res.status(404).send("404: Page not found");
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
}

main();