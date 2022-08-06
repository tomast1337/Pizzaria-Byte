import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GerirIngredientesPage.module.scss";
import MenuNav from "../../Components/Admin/AdminNavbar";
import {
    SelectCarregando,
    SelectErro,
    SelectIngredientes,
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
} from "../../Features/Admin/GerirIngredientesSlice";

const GerirIngredientesPage = () => {
    const dispatch = useDispatch();


    const carregando = useSelector(SelectCarregando);
    const erro = useSelector(SelectErro);
    const ingredientes = useSelector(SelectIngredientes);
    const nome = useSelector(SelectNome);
    const preco = useSelector(SelectPreco);
    const imagem = useSelector(SelectImagem);
    const descricao = useSelector(SelectDescricao);
    const pesoPorcao = useSelector(SelectPesoPorcao);


    const [imagemPreview,setImagemPreview] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    React.useEffect(() => {
        // set window title
        document.title = "Gerir Ingredientes";
    }, []);

    return (
        <>
            <MenuNav />
            <div className={styles.page}>
                <div className={styles.container}>
                    <h1>Gerir Ingredientes</h1>
                </div>
                {/* Lista de Ingredientes cadastrados */}
                <div className={styles.container}>
                    <h2>Ingredientes Disponíveis</h2>
                    {
                        carregando ? (
                            <>
                                <h2>Carregando...</h2>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    }
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
                    <h2>Alterar Ingrediente</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => dispatch(setNome(e.target.value))}
                                placeholder="Nome do ingrediente"
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="preco">Preço</label>
                            <input
                                type="number"
                                id="preco"
                                step="0.01"
                                value={preco}
                                onChange={(e) => dispatch(setPreco(e.target.value))}
                                placeholder="Preço do ingrediente"
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label htmlFor="imagem">Imagem Preview</label>
                            {
                                imagemPreview !== "" ? (
                                    <img src={imagemPreview} alt="Imagem Preview" />
                                ) : (
                                    <div className={styles["empty-img"]}>
                                        <h3>Nenhuma imagem selecionada</h3>
                                    </div>
                                )
                            }
                        </div>

                        <div className={styles["form-group"]}>
                            <label htmlFor="imagem">Imagem</label>
                            <input
                                type="file"
                                id="imagem"
                                value={imagem}
                                onChange={(e) => {
                                    dispatch(setImagem(e.target.value))
                                    setImagemPreview(URL.createObjectURL(e.target.files[0]))
                                }}
                                accept="image/*"
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                id="descricao"
                                rows={5}
                                value={descricao}
                                onChange={(e) => dispatch(setDescricao(e.target.value))}
                                placeholder="Descrição do ingrediente"
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="pesoPorcao">Peso por Porção</label>
                            <input
                                type="number"
                                id="pesoPorcao"
                                step="0.01"
                                value={pesoPorcao}
                                onChange={(e) => dispatch(setPesoPorcao(e.target.value))}
                                placeholder="Peso por Porção"
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <button type="submit">Alterar</button>
                            <button type="reset">Limpar</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    );
}

export default GerirIngredientesPage;