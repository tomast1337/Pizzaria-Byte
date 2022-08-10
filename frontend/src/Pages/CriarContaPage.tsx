import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LandingPageModel from '../Components/LandingPageModel';
import {
    criarContaData,
    criarContaFetch,
    selectConfirmarSenha,
    selectEmail,
    selectError,
    selectNome,
    selectSenha,
    setConfirmarSenha,
    setEmail,
    setNome,
    setSenha
} from '../Features/Login/CriarContaSlice';
import styles from './CriarContaPage.module.scss';

const CriarContaPage = () => {
    const nome = useSelector(selectNome);
    const email = useSelector(selectEmail);
    const senha = useSelector(selectSenha);
    const confirmarSenha = useSelector(selectConfirmarSenha);
    const erro = useSelector(selectError);

    const dispatcher = useDispatch();

    const navigate = useNavigate();

    React.useEffect(() => {
        document.title = 'Pizzaria Byte - Criar Usuário';
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: criarContaData = {
            nome,
            email,
            senha,
            confirmarSenha
        };
        if (erro === '') {
            dispatcher(criarContaFetch(data));
        }
        if (erro === '') {
            // redirect to login page
            navigate('/');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.logo}>
                <h2>Criar Conta</h2>
            </div>
            <div>
                <div className={styles.erro}>
                    <h3>{erro}</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-group']}>
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            value={nome}
                            onChange={(e) =>
                                dispatcher(setNome(e.target.value))
                            }
                            type="text"
                            autoComplete="on"
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) =>
                                dispatcher(setEmail(e.target.value))
                            }
                            type="email"
                            autoComplete="on"
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            value={senha}
                            onChange={(e) =>
                                dispatcher(setSenha(e.target.value))
                            }
                            type="password"
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                        <input
                            id="confirmarSenha"
                            value={confirmarSenha}
                            onChange={(e) =>
                                dispatcher(setConfirmarSenha(e.target.value))
                            }
                            type="password"
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <button className={styles['form-button']} type="submit">
                            Criar Conta
                        </button>
                    </div>
                    <div className={styles['form-group']}>
                        <Link className={styles['form-button']} to="/">
                            Voltar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default () => (
    <LandingPageModel>
        <CriarContaPage />
    </LandingPageModel>
);
