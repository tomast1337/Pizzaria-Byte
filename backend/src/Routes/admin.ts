import express from 'express';
import formidable from 'express-formidable';
import fs from 'fs';
import { ingredientes, pedidos, pizzas, produtos, usuarios } from '../Negocio';

const router: express.Router = express.Router();

// criar diretório para imagens se não existirem
if (!fs.existsSync('./public/uploads')) {
    fs.mkdirSync('./public');
    fs.mkdirSync('./public/uploads');
    console.log('Diretório "uploads" não existe e foi criado');
}

const upload = formidable({
    encoding: 'utf-8',
    uploadDir: './public/uploads',
    multiples: true,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024
});

// Rota para o admin ver as informações de um usuário pelo email
router.get('/user/:email', async (req: any, res: any) => {
    const { email } = req.params;

    const user: any = await usuarios.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Usuário não cadastrado' });
    }

    return res.status(200).json(user);
});

// Rota para um admin ver todos os pedidos de um email
router.get('/pedidos/:email', async (req: any, res: any) => {
    const { email } = req.params;

    const user = await usuarios.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Usuário não cadastrado' });
    }

    const pedidos_found: any = await pedidos.find({ email: user.email });

    return res.status(200).json(pedidos_found);
});

// Rota para uma admin alterar o tipo de usuário pelo email
router.post('/promover/:email', async (req: any, res: any) => {
    const { email } = req.params;
    const { type } = req.body;

    const user = await usuarios.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Usuário não cadastrado' });
    }
    const validType = ['admin', 'user', 'cozinheiro', 'entregador'];
    if (!validType.includes(type)) {
        return res.status(400).json({ error: 'Tipo de usuário inválido' });
    } else {
        user.type = type;
        await user.save();
        return res.status(200).json(user);
    }
});

const checkFiles = (files: any) => {
    if (!files.imagem) {
        console.log('Não foi enviado nenhuma imagem');
        return false;
    }
    return true;
};

enum tiposPaths {
    ingrediente = './assets/imgs/ingredientes/',
    pizza = './assets/imgs/pizzas/',
    produto = './assets/imgs/produtos/'
}

const moveFiles = (tipo: tiposPaths, imagem: any, nome: string) => {
    // verifica se os diretórios existem e cria se não existirem
    if (!fs.existsSync(tipo)) {
        // remove de dot and split by /
        const folderNames = tipo.replace(/\./g, '').split('/');
        let path = '.';
        for (let i = 0; i < folderNames.length; i++) {
            path += '/' + folderNames[i];
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
                console.log(`O diretório ${path} não existe e foi criado`);
            }
        }
    }

    const path = tipo.toString();
    let newPath = `${path}${nome}.${imagem.path.split('.').at(-1)}`;
    try {
        fs.renameSync(imagem.path, newPath);
    } catch (error) {
        console.log(error);
    }
    return newPath;
};

// Rota para adicionar ou editar um ingrediente
router.post('/ingrediente', upload, async (req: any, res: any) => {
    const files = req.files;
    const { _id, nome, preco, descricao, pesoPorcao } = req.fields;

    if (!(nome || preco || descricao || pesoPorcao)) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    const ingrediente = await ingredientes.findOne({ _id });

    if (ingrediente) {
        // Editar ingrediente
        ingrediente.nome = nome;
        ingrediente.preco = preco;
        ingrediente.descricao = descricao;
        ingrediente.pesoPorcao = pesoPorcao;
        if (checkFiles(files)) {
            ingrediente.imagem = moveFiles(
                tiposPaths.ingrediente,
                files.imagem,
                nome
            );
        }
        await ingrediente.save();
        return res.status(200).json(ingrediente);
    } else {
        // Novo ingrediente
        const novoIngrediente = new ingredientes({
            nome,
            preco,
            descricao,
            pesoPorcao,
            imagem: moveFiles(tiposPaths.ingrediente, files.imagem, nome)
        });
        await ingredientes.create(novoIngrediente);
        return res.status(200).json(novoIngrediente);
    }
});

// Rota para adicionar ou editar uma pizza
router.post('/pizza', upload, async (req: any, res: any) => {
    const files = req.files;
    const { _id, nome, descricao, ingredientes } = req.fields;

    if (!(nome || descricao || ingredientes) || !(files && _id)) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    const pizza = await pizzas.findOne({ _id });

    if (pizza) {
        // Editar pizza
        pizza.nome = nome;
        pizza.descricao = descricao;
        pizza.ingredientes = ingredientes;

        if (checkFiles(files)) {
            pizza.imagem = moveFiles(tiposPaths.pizza, files.imagem, nome);
        }
        await pizza.save();
        return res.status(200).json(pizza);
    } else {
        // Novo pizza
        const novaPizza = new pizzas({
            nome,
            descricao,
            ingredientes,
            imagem: moveFiles(tiposPaths.pizza, files.imagem, nome)
        });
        await pizzas.create(novaPizza);
        return res.status(200).json(novaPizza);
    }
});

// Rota para adicionar ou editar um produto
router.post('/produto', upload, async (req: any, res: any) => {
    const files = req.files;
    const { _id, nome, descricao, preco } = req.fields;

    if (!(nome || descricao || preco) || !(files && _id)) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    const produto = await produtos.findOne({ _id });

    if (produto) {
        // Editar produto
        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        if (checkFiles(files)) {
            produto.imagem = moveFiles(tiposPaths.produto, files, nome);
        }
        await produto.save();
        return res.status(200).json(produto);
    } else {
        // Novo produto
        const novoProduto = new produtos({
            nome,
            descricao,
            preco,
            imagem: moveFiles(tiposPaths.produto, files, nome)
        });
        await produtos.create(novoProduto);
        return res.status(200).json(novoProduto);
    }
});

// Rota para excluir um usuário pelo email
router.delete('/del/user/:email', async (req: any, res: any) => {
    const { email } = req.params;

    const user = await usuarios.findOne({ email });

    if (!user) {
        return res.status(401).json({ error: 'Usuário não cadastrado' });
    }
    await user.remove();
    return res.status(200).json(user);
});

// Rota para excluir um ingrediente pelo id
router.delete('/del/ingrediente/:id', async (req: any, res: any) => {
    const { id } = req.params;

    const ingrediente = await ingredientes.findById(id);
    if (!ingrediente) {
        return res.status(401).json({ error: 'Ingrediente não cadastrado' });
    } else {
        const image_to_delete = ingrediente.imagem;
        fs.unlinkSync(image_to_delete);
        await ingrediente.remove();
        console.log(`O ingrediente ${ingrediente.nome} foi excluído`);
        return res.status(200).json(ingrediente);
    }
});

// Rota para excluir uma pizza pelo id
router.delete('/del/pizza/:id', async (req: any, res: any) => {
    const { id } = req.params;

    const pizza = await pizzas.findById(id);

    if (!pizza) {
        return res.status(401).json({ error: 'Pizza não cadastrada' });
    } else {
        await pizza.remove();
        return res.status(200).json(pizza);
    }
});

// Rota para excluir um produto pelo id
router.delete('/del/produto/:id', async (req: any, res: any) => {
    const { id } = req.params;

    const produto = await produtos.findById(id);

    if (!produto) {
        return res.status(401).json({ error: 'Produto não cadastrado' });
    } else {
        await produto.remove();
        return res.status(200).json(produto);
    }
});

// Rotas para o admin ver relatório de vendas
router.get('/relatorio/:dataInicio/:dataFim', async (req: any, res: any) => {
    const { dataInicio, dataFim } = req.params;
});

export default router;
