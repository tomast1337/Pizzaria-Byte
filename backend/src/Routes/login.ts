import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usuarios } from '../Negocio'
import * as dotenv from "dotenv";
dotenv.config();

const saltRounds: number = 10;

const JWT_SECRET: string | null = process.env.JWT_SECRET || null;

if (JWT_SECRET === null) {
    console.error('JWT_SECRET is not defined in .env');
    process.exit(1);
}

const router: express.Router = express.Router();

router.post('/',
    async (req: any, res: any) => {
        const { email, password } = req.body;

        const user = await usuarios.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Usuário não cadastrado", });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ error: "Senha incorreta", });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    }
);

router.post('/register',
    async (req: any, res: any) => {

        const { email, password, nome } = req.body;

        if (!email || !password || !nome) {
            return res.status(400).json({ error: "Dados incompletos", });
        }

        // usuário ja existe? > Verifica se usuário existe
        const user = await usuarios.findOne({ email });
        if (user) {
            return res.status(401).json({ error: 'Usuário já cadastrado', });
        }

        // hash da senha
        await bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
            bcrypt.hash(password, salt, (err: any, hash: any) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao criar conta', });
                }
                // adicionar usuário
                const newUser = new usuarios({
                    email,
                    senha: hash,
                    nome,
                });
                newUser.save();
                console.log('Usuário cadastrado com sucesso');
                return res.status(200).json({ message: 'Usuário cadastrado com sucesso', });
            }
            );
        });
    }
);

export default router;