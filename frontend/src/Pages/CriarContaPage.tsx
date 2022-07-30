import * as React from "react";
import LandingPageModel from "../Components/LandingPageModel";
import styles from "./CriarContaPage.module.scss";

const CriarContaPage = () => {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [confirmarSenha, setConfirmarSenha] = React.useState("");
    const [erro, setErro] = React.useState("");

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
                        <label htmlFor="nome">Nome:</label>
                        <input
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="senha">Senha:</label>
                        <input
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                        <input
                            id="confirmarSenha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <button type="submit">Criar Conta</button>
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
) ;