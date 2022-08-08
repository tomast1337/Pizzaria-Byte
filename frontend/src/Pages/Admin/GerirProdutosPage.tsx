import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuNav from '../../Components/Admin/AdminNavbar';
import {
    deleteProduto, ProdutoData, selectDescricao, selectErro, selectIdSelecionado, selectImagem, selectNome, selectPreco, setDescricao, setErro, setidSelecionado, setImagem, setNome, setPreco, submit
} from '../../Features/Admin/GerirProdutosSlice';
import {
    fetchProdutos,
    ProdutoType,
    SelectCarregandoProdutos,
    SelectProdutos
} from '../../Features/CommonSlice';
import { verifyToken } from '../../utils';
import { BACKEND_URL_NO_API } from '../../variables';
import styles from './GerirProdutosPage.module.scss';

const Produto = (prop: ProdutoType) => {
    const dispatcher = useDispatch();
    const selecionado = useSelector(selectIdSelecionado);

    const selecionarButton = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (selecionado === prop.id) {
            // desselecionar
            dispatcher(setidSelecionado(null));
            dispatcher(setNome(''));
            dispatcher(setDescricao(''));
            dispatcher(setImagem(''));
            dispatcher(setPreco(5));
        } else {
            // selecionar
            dispatcher(setidSelecionado(prop._id));
            dispatcher(setNome(prop.nome));
            dispatcher(setDescricao(prop.descricao));
            dispatcher(setImagem(prop.imagem));
            dispatcher(setPreco(prop.preco));
        }
    };
    return (
        <div className={styles.produto}>
            <div className={styles.nome}>{prop.nome}</div>
            <div className={styles.filed}>
                <span>Preço R$.{prop.preco}</span>
            </div>
            <div className={styles.imagem}>
                <img
                    src={BACKEND_URL_NO_API + prop.imagem.replace('.', '')}
                    alt={prop.nome}
                />
            </div>
            <button className={styles.selecionar} onClick={selecionarButton}>
                {selecionado === prop._id ? 'Desselecionar' : 'Selecionar'}
            </button>
        </div>
    );
};

const ProdutoList = () => {
    const dispatcher = useDispatch();
    const ingredientes = useSelector(SelectProdutos);
    const carregando = useSelector(SelectCarregandoProdutos);

    React.useEffect(() => {
        dispatcher(fetchProdutos());
    }, [dispatcher]);
    return (
        <>
            {carregando ? (
                <>
                    <h2>Carregando...</h2>
                </>
            ) : ingredientes.length > 0 ? (
                <div className={styles.produtosList}>
                    {ingredientes.map((produto: ProdutoType, index: number) => {
                        return <Produto key={index} {...produto} />;
                    })}
                </div>
            ) : (
                <>
                    <h2>Nenhum produto encontrado</h2>
                </>
            )}
        </>
    );
};

const GerirProdutosPage = () => {
    const dispatcher = useDispatch();
    const _idSelecionado = useSelector(selectIdSelecionado);
    const nome = useSelector(selectNome);
    const descricao = useSelector(selectDescricao);
    const imagem = useSelector(selectImagem);
    const preco = useSelector(selectPreco);
    const erro = useSelector(selectErro);
    const [imagemPreview, setImagemPreview] = React.useState('');
    const navigate = useNavigate()
    
    const scrollToTop = () => {
        //scroll to id = "Ingredientes"
        const elem = document.getElementById('Produtos');
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const imageFile = document.getElementById('imagem') as HTMLInputElement;
        const file = imageFile.files[0];
        const produtoData = {
            _idSelecionado: _idSelecionado,
            nome: nome,
            descricao: descricao,
            imagem: file,
            preco: preco
        } as ProdutoData;
        dispatcher(submit(produtoData));

        setTimeout(() => {
            dispatcher(fetchProdutos());
        }, 1000);
        setTimeout(() => {
            dispatcher(setErro(''));
        }, 5000);
        scrollToTop();
    };
    const resetFields = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        dispatcher(setidSelecionado(''));
        dispatcher(setNome(''));
        dispatcher(setDescricao(''));
        dispatcher(setImagem(''));
        dispatcher(setPreco(5));
        setImagemPreview('');
        scrollToTop();
    };
    
    React.useEffect(() => {
        //set window title
        document.title = 'Gerir Produtos';
        
        if(!verifyToken()) {
            navigate('/')
        }
    }, []);
    return (
        <>
            <MenuNav />
            <div className={styles.page}>
                <div className={styles.container}>
                    <h1>Gerir Produtos</h1>
                </div>
                {/* Lista de Produtos cadastrados */}
                <div className={styles.container} id="Produtos">
                    <h2>Produtos Disponíveis</h2>
                    <ProdutoList />
                </div>
                {/* Formulário para alterar ingrediente
                    campos:
                    _id: string;
                    nome: string;
                    descricao: string;
                    imagem: file
                    preco: number;
                */}
                <div className={styles.container}>
                    <h2>Editar Produto</h2>
                    <div className={styles.erro}>
                        <h3>{erro}</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['form-group']}>
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) =>
                                    dispatcher(setNome(e.target.value))
                                }
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                id="descricao"
                                value={descricao}
                                onChange={(e) =>
                                    dispatcher(setDescricao(e.target.value))
                                }
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="preco">Preço</label>
                            <input
                                type="number"
                                id="preco"
                                value={preco}
                                onChange={(e) =>
                                    dispatcher(
                                        setPreco(parseInt(e.target.value))
                                    )
                                }
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="imagem">Imagem Preview</label>
                            {imagemPreview !== '' ? (
                                <img src={imagemPreview} alt="Imagem Preview" />
                            ) : (
                                <div className={styles['empty-img']}>
                                    <h3>Nenhuma imagem selecionada</h3>
                                </div>
                            )}
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="imagem">Imagem</label>
                            <input
                                type="file"
                                id="imagem"
                                onChange={(e) => {
                                    setImagemPreview(
                                        URL.createObjectURL(e.target.files[0])
                                    );
                                    dispatcher(setImagem(e.target.value));
                                }}
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <button type="submit">
                                {_idSelecionado === ''
                                    ? 'Cadastrar'
                                    : 'Atualizar'}
                            </button>
                            <button type="reset" onClick={resetFields}>
                                Limpar
                            </button>
                            {/* Delete se não for uma criação */}
                            {_idSelecionado !== '' && (
                                <button
                                    className={styles['delete-button']}
                                    onClick={(
                                        e: React.MouseEvent<HTMLButtonElement>
                                    ) => {
                                        console.log(_idSelecionado);
                                        e.preventDefault();
                                        dispatcher(
                                            deleteProduto(_idSelecionado)
                                        );
                                        setTimeout(() => {
                                            dispatcher(fetchProdutos());
                                        }, 1000);
                                        setTimeout(() => {
                                            dispatcher(setErro(''));
                                        }, 5000);
                                        scrollToTop();
                                    }}
                                >
                                    Excluir
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default GerirProdutosPage;
