import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();


export type tokenData = {
    id: string;
    type: string;
}

// middleware para verificar se o token é valido
export const isLogged = async (req: any, res: any, next: any) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: "Token não informado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as tokenData;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Autentificação inválida" });
    }
}

// middleware para verificar se o token é de um usuário admin
export const isAdmin = async (req: any, res: any, next: any) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: "Token não informado" });

    try {
        // decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as tokenData;
        // verifica se o usuário é admin
        if (decoded.type !== 'admin') return res.status(401).json({ error: "Autenção inválida" });
        // se for admin, continua o fluxo
        next();
    } catch (error) {
        return res.status(401).json({ error: "Autentificação inválida" });
    }
}

// middleware para verificar se o token é de um usuário cliente
export const isCliente = async (req: any, res: any, next: any) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: "Token não informado" });

    try {
        // decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as tokenData;
        // verifica se o usuário é cliente
        if (decoded.type !== 'user') return res.status(401).json({ error: "Autenção inválida" });
        // se for cliente, continua o fluxo
        next();
    } catch (error) {
        return res.status(401).json({ error: "Autentificação inválida" });
    }
}

// middleware para verificar se o token é de um usuário cozinheiro
export const isCozinheiro = async (req: any, res: any, next: any) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: "Token não informado" });

    try {
        // decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as tokenData;
        // verifica se o usuário é cozinheiro
        if (decoded.type !== 'cozinheiro') return res.status(401).json({ error: "Autenção inválida" });
        // se for cozinheiro, continua o fluxo
        next();
    } catch (error) {
        return res.status(401).json({ error: "Autentificação inválida" });
    }
}

// middleware para verificar se o token é de um usuário entregador
export const isEntregador = async (req: any, res: any, next: any) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: "Token não informado" });

    try {
        // decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as tokenData;
        // verifica se o usuário é entregador
        if (decoded.type !== 'entregador') return res.status(401).json({ error: "Autenção inválida" });
        // se for entregador, continua o fluxo
        next();
    } catch (error) {
        return res.status(401).json({ error: "Autentificação inválida" });
    }
}