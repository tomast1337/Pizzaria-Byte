import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { usuarios } from '../Negocio';
dotenv.config();

const saltRounds: number = (process.env.SALT_ROUNDS as unknown as number) || 10;

const JWT_SECRET: string = process.env.JWT_SECRET || 'null';

if (JWT_SECRET === null) {
    console.error('JWT_SECRET is not defined in .env');
    process.exit(1);
}

const router: express.Router = express.Router();

router.post('/', async (req: any, res: any) => {
    const { email, password } = req.body;

    const user = await usuarios.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Usuário não cadastrado' });
    }

    await bcrypt.compare(password, user.senha, (err: any, result: any) => {
        if (result) {
            const token = jwt.sign(
                {
                    id: user._id,
                    type: user.type,
                    email: user.email
                },
                JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ error: 'Email ou Senha inválidos' });
        }
    });
});

router.post('/register', async (req: any, res: any) => {
    const { email, password, nome } = req.body;

    if (!email || !password || !nome) {
        return res.status(400).json({ error: 'Dados incompletos' });
    }

    // usuário ja existe? > Verifica se usuário existe
    const user = await usuarios.findOne({ email });
    if (user) {
        return res.status(401).json({ error: 'Usuário já cadastrado' });
    }

    // hash da senha
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const senha = bcrypt.hashSync(password, salt);
        // adicionar usuário
        const newUser = new usuarios({
            email,
            senha,
            nome
        });
        newUser.save();
        return res
            .status(200)
            .json({ message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao criar conta' });
    }
});

router.post('/verify', async (req: any, res: any) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token não informado' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido' });
    }
    return res.status(200).json({ message: 'Token válido' });
});

export default router;
