import * as React from "react";
import { Link } from "react-router-dom";
import LandingPageModel from "../Components/LandingPageModel";
import styles from "./LoginPage.module.scss";

const LoingPage = () => {
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [erro, setErro] = React.useState("");

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
                <form>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                        />
                        </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
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