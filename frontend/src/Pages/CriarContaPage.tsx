import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    selectConfirmarSenha,
    selectEmail,
    selectError,
    selectNome,
    selectSenha,
    setNome,
    setEmail,
    setSenha,
    setConfirmarSenha
} from "../Features/Login/CriarContaSlice";
import LandingPageModel from "../Components/LandingPageModel";
import styles from "./CriarContaPage.module.scss";

const CriarContaPage = () => {
    const nome = useSelector(selectNome);
    const email = useSelector(selectEmail);
    const senha = useSelector(selectSenha);
    const confirmarSenha = useSelector(selectConfirmarSenha);
    const erro = useSelector(selectError);

    const dispatcher = useDispatch();

    React.useEffect(() => {
        document.title = "Pizzaria ON - Criar Usuário";
    }, []);

    const handleSubmit = () => {

    }

    return (
        <div className={styles.page}>
            <div className={styles.logo}>
                <h1>Pizzaria ON</h1>
                <h2>Criar Conta</h2>
            </div>
            <div>
                <div className={styles.erro}>
                    <h3>
                        {erro}
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            value={nome}
                            onChange={(e) =>
                                dispatcher(setNome(e.target.value))
                            }
                            type="text"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) =>
                                dispatcher(setEmail(e.target.value))
                            }
                            type="email"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            value={senha}
                            onChange={(e) =>
                                dispatcher(setSenha(e.target.value))
                            }
                            type="password"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                        <input
                            id="confirmarSenha"
                            value={confirmarSenha}
                            onChange={(e) =>
                                dispatcher(setConfirmarSenha(e.target.value))
                            }
                            type="password"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <button className={styles["form-button"]} type="submit">Criar Conta</button>
                    </div>
                    <div className={styles["form-group"]}>
                        <Link className={styles["form-button"]} to="/">Voltar</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default () => (
    <LandingPageModel>
        <CriarContaPage />
    </LandingPageModel>
);