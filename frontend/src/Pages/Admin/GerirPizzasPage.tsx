import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './GerirPizzasPage.module.scss';
import MenuNav from '../../Components/Admin/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils';
import IngredientePizza from '../../Components/ingreditePizza';
import {
    setNome,
    setPreco,
    setImagem,
    setDescricao,
    setidSelecionado,
    setErro,
    SelectErro,
    SelectIdSelecionado,
    SelectNome,
    SelectPreco,
    SelectImagem,
    SelectDescricao
} from "../../Features/Admin/GerirPizzasSlice";
const GerirPizzasPage = () => {
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const erro = useSelector(SelectErro);
    const nome = useSelector(SelectNome);
    const preco = useSelector(SelectPreco);
    const imagem = useSelector(SelectImagem);
    const descricao = useSelector(SelectDescricao);
    const _idSelecionado = useSelector(SelectIdSelecionado);

    const [imagemPreview, setImagemPreview] = React.useState('');

    React.useEffect(() => {
        // set window title
        window.document.title = 'Gerir Pizzas';
        if (!verifyToken()) {
            navigate('/');
        }
    }, []);

    const scrollToTop = () => {
        //scroll to id = "Ingredientes"
        const elem = document.getElementById('topo');
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const resetFields = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatcher(setNome(''));
        dispatcher(setPreco(''));
        dispatcher(setImagem(''));
        dispatcher(setDescricao(''));
        dispatcher(setidSelecionado(''));
        dispatcher(setErro(''));

        setImagemPreview('');

        scrollToTop();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <>
            <MenuNav />
            <div id="topo" className={styles.page}>
                <h1>Gerir Pizzas</h1>
                <div>
                    <h2>Pizzas Cadastradas</h2>
                </div>
                <div>
                    <IngredientePizza />
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
                                placeholder="Nome do ingrediente"
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
                                value={imagem}
                                onChange={(e) => {
                                    setImagemPreview(
                                        URL.createObjectURL(e.target.files[0])
                                    );
                                    dispatcher(setImagem(e.target.value));
                                }}
                                accept="image/*"
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                id="descricao"
                                rows={5}
                                value={descricao}
                                onChange={(e) =>
                                    dispatcher(setDescricao(e.target.value))
                                }
                                placeholder="Descrição do ingrediente"
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <button type="reset" onClick={resetFields}>
                                Limpar
                            </button>
                            <button type="submit">
                                Salvar
                            </button>
                            <button type="submit">
                                Excluir
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default GerirPizzasPage;
