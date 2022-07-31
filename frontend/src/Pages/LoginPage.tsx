import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectEmail,
    selectSenha,
    selectError,
    setEmail,
    setSenha,
} from "../Features/Login/LoginSlice";
import { Link } from "react-router-dom";
import LandingPageModel from "../Components/LandingPageModel";
import styles from "./CriarContaPage.module.scss";


const LoingPage = () => {
    const email = useSelector(selectEmail);
    const senha = useSelector(selectSenha);
    const erro = useSelector(selectError);

    const dispatcher = useDispatch();


    React.useEffect(() => {
        document.title = "Pizzaria ON - Login";
    }, []);

    const handleSubmit = () => {

    }

    return (
        <div className={styles.page}>
            <div className={styles.logo}>
                <h1>Pizzaria ON</h1>
                <h2>Login</h2>
            </div>
            <div>
                <div className={styles.erro}>
                    <h3>
                        {erro}
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
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
                        <button type="submit">Entrar</button>
                    </div>
                    <div className={styles["form-group"]}>
                        <Link to="/criar-conta">Criar Conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default () => (

    <LandingPageModel>
        <LoingPage />
    </LandingPageModel>
)