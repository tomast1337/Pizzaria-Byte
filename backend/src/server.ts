import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import getConnection from './DataBase';
import rotas from './Routes';

const main = async () => {
    dotenv.config();
    const PORT: string = '3000' || process.env.PORT;
    const server: express.Application = express();

    try {
        await getConnection();
        console.log('Banco de dados conectado com sucesso');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    // criar pasta assets caso não exista
    if (!fs.existsSync('./assets')) fs.mkdirSync('./assets');
    //servir arquivos estáticos na pasta assets
    server.use('/assets', express.static('assets'));

    //criar pasta public caso não exista
    if (!fs.existsSync('./public')) fs.mkdirSync('./public');
    //servir arquivos estáticos na pasta public
    server.use('/', express.static('public'));

    // Cors middleware
    server.use(cors());

    // application/json middleware
    server.use(express.json());

    //rotas
    server.use('/api', rotas);

    // 404 handler
    server.use((req, res, next) => {
        res.status(404).send('404: Page not found');
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
};

export default main();

main();
