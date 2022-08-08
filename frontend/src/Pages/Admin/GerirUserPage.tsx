import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuNav from '../../Components/Admin/AdminNavbar';
import { verifyToken } from '../../utils';
import styles from './GerirUserPage.module.scss';

const UserEditForm = () => {
    const dispatcher = useDispatch();
    const changeUserRole = () => {};
    const navigate = useNavigate();
    React.useEffect(() => {
        // set window title
        window.document.title = 'Gerir Usuários';
        if (!verifyToken()) {
            navigate('/');
        }
    }, []);
    return (
        <form>
            {/* fields:
            - Ver _id
            - Ver email
            - Ver Nome
            - Mudar senha
            - Mudar tipo com radio button:
                tipos:
                user
                admin
                entregador
                cozinheiro
            - Ver Histórico de pedidos
        */}
            <div className={styles['form-group']}>
                <span>#ID</span>
            </div>
            <div className={styles['form-group']}>
                <span>Email</span>
            </div>
            <div className={styles['form-group']}>
                <span>Nome</span>
            </div>
            <div className={styles['form-group']}>
                <label htmlFor="alterarSenha">Altear senha</label>
                <input
                    type="text"
                    id="alterarSenha"
                    placeholder="Digite nova senha"
                />
            </div>
            <div className={styles['form-group']}>
                <h2>Tipo do usuário</h2>
                <div className={styles.radioOption}>
                    <span>Cliente:</span>
                    <input type="radio" id="user" name="user" value="user" />
                </div>
                <div className={styles.radioOption}>
                    <span>Admin:</span>
                    <input type="radio" id="admin" name="admin" value="admin" />
                </div>
                <div className={styles.radioOption}>
                    <span>Entregador:</span>
                    <input
                        type="radio"
                        id="entregador"
                        name="entregador"
                        value="entregador"
                    />
                </div>
                <div className={styles.radioOption}>
                    <span>Cozinheiro:</span>
                    <input
                        type="radio"
                        id="cozinheiro"
                        name="cozinheiro"
                        value="cozinheiro"
                    />
                </div>
            </div>
            <div className={styles['form-group']}>
                <button type="submit">Confirmar alterações</button>
            </div>
            <div className={styles.pedidos}>
                <h2>Pedidos de </h2>
            </div>
        </form>
    );
};

const GerirUserPage = () => {
    const dispatcher = useDispatch();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {};
    return (
        <>
            <MenuNav />
            {/* Campo para buscar email */}
            <div className={styles.page}>
                <div className={styles.container}>
                    <h1>Gerir Usuários</h1>
                </div>
                <div className={styles.container}>
                    <h2>Buscar Por email</h2>
                    <form onSubmit={handleSearch}>
                        <div className={styles['form-group']}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email do Usuário"
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <button type="submit">Buscar</button>
                        </div>
                    </form>
                </div>
                <div className={styles.container}>
                    <h1>Informações do Usuário</h1>
                    <h2>Nem um usuário selecionado</h2>
                    <UserEditForm />
                </div>
            </div>
        </>
    );
};

export default GerirUserPage;
