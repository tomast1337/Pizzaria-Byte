import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './GerirIngredientesPage.module.scss';
import MenuNav from '../../Components/Admin/AdminNavbar';
import {
    SelectErro,
    SelectNome,
    SelectPreco,
    SelectImagem,
    SelectDescricao,
    SelectPesoPorcao,
    setNome,
    setPreco,
    setImagem,
    setDescricao,
    setPesoPorcao,
    IngredienteData,
    SelectIdSelecionado,
    setidSelecionado,
    submit,
    setErro,
    deleteIngrediente
} from '../../Features/Admin/GerirIngredientesSlice';
import {
    fetchIngredientes,
    SelectCarregandoIngredientes,
    SelectIngredientes,
    IngredienteType
} from '../../Features/CommonSlice';
import { BACKEND_URL_NO_API } from '../../variables';

const Ingrediente = (prop: IngredienteType) => {
    const dispatcher = useDispatch();

    const selecionado = useSelector(SelectIdSelecionado);

    const selecionarButton = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (selecionado === prop._id) {
            // desselecionar
            dispatcher(setidSelecionado(''));
            dispatcher(setNome(''));
            dispatcher(setPreco(''));
            dispatcher(setDescricao(''));
            dispatcher(setPesoPorcao(''));
        } else {
            // selecionar
            dispatcher(setidSelecionado(prop._id));
            dispatcher(setNome(prop.nome));
            dispatcher(setPreco(prop.preco));
            dispatcher(setDescricao(prop.descricao));
            dispatcher(setPesoPorcao(prop.pesoPorcao));
        }
    };

    return (
        <div className={styles.ingrediente}>
            <div className={styles.nome}>{prop.nome}</div>
            <div className={styles.filed}>
                <span>Preço R$.{prop.preco}</span>
                <span>Peso {prop.pesoPorcao} g</span>
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

const IngredientesList = () => {
    const dispatcher = useDispatch();
    const ingredientes = useSelector(SelectIngredientes);
    const carregando = useSelector(SelectCarregandoIngredientes);

    React.useEffect(() => {
        // set window title
        dispatcher(fetchIngredientes());
    }, [dispatcher]);

    return (
        <>
            {carregando ? (
                <>
                    <h2>Carregando...</h2>
                </>
            ) : ingredientes.length > 0 ? (
                <div className={styles.ingredienteList}>
                    {ingredientes.map(
                        (ingrediente: IngredienteType, index: number) => {
                            return <Ingrediente key={index} {...ingrediente} />;
                        }
                    )}
                </div>
            ) : (
                <>
                    <h2>Nenhum ingrediente cadastrado</h2>
                </>
            )}
        </>
    );
};

const GerirIngredientesPage = () => {
    const dispatcher = useDispatch();

    const erro = useSelector(SelectErro);
    const nome = useSelector(SelectNome);
    const preco = useSelector(SelectPreco);
    const imagem = useSelector(SelectImagem);
    const descricao = useSelector(SelectDescricao);
    const pesoPorcao = useSelector(SelectPesoPorcao);
    const _idSelecionado = useSelector(SelectIdSelecionado);
    const [imagemPreview, setImagemPreview] = React.useState('');

    const scrollToTop = () => {
        //scroll to id = "Ingredientes"
        const elem = document.getElementById('Ingredientes');
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const imageFile = document.getElementById('imagem') as HTMLInputElement;
        const file = imageFile.files[0];
        const ingredienteDatar: IngredienteData = {
            _idSelecionado: _idSelecionado,
            nome: nome,
            preco: preco,
            imagem: file,
            descricao: descricao,
            pesoPorcao: pesoPorcao
        } as IngredienteData;

        dispatcher(submit(ingredienteDatar));

        setTimeout(() => {
            dispatcher(fetchIngredientes());
        }, 1000);
        setTimeout(() => {
            dispatcher(setErro(''));
        }, 5000);
        scrollToTop();
    };

    const resetFields = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatcher(setNome(''));
        dispatcher(setPreco(1));
        dispatcher(setDescricao(''));
        dispatcher(setPesoPorcao(10));
        setImagemPreview('');
        scrollToTop();
    };

    React.useEffect(() => {
        // set window title
        document.title = 'Gerir Ingredientes';
    }, []);

    return (
        <>
            <MenuNav />
            <div className={styles.page}>
                <div className={styles.container}>
                    <h1>Gerir Ingredientes</h1>
                </div>
                {/* Lista de Ingredientes cadastrados */}
                <div className={styles.container} id="Ingredientes">
                    <h2>Ingredientes Disponíveis</h2>
                    <IngredientesList />
                </div>
                {/* Formulário para alterar ingrediente
                    campos:
                    nome:  text
                    preco: number
                    imagem: file
                    descricao: textArea
                    pesoPorcao: number
                */}
                <div className={styles.container}>
                    <h2>Editar Ingrediente</h2>
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
                                placeholder="Nome do ingrediente"
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="preco">Preço</label>
                            <input
                                type="number"
                                id="preco"
                                step="0.25"
                                value={preco}
                                onChange={(e) =>
                                    dispatcher(setPreco(e.target.value))
                                }
                                placeholder="Preço do ingrediente"
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
                            <label htmlFor="pesoPorcao">Peso por Porção</label>
                            <input
                                type="number"
                                id="pesoPorcao"
                                step="0.25"
                                value={pesoPorcao}
                                onChange={(e) =>
                                    dispatcher(setPesoPorcao(e.target.value))
                                }
                                placeholder="Peso por Porção"
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
                                        e.preventDefault();
                                        dispatcher(
                                            deleteIngrediente(_idSelecionado)
                                        );
                                        setTimeout(() => {
                                            dispatcher(fetchIngredientes());
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

export default GerirIngredientesPage;
