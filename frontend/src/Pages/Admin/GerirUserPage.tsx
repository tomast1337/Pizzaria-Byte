import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuNav from '../../Components/Admin/AdminNavbar';
import { verifyToken } from '../../utils';
import styles from './GerirUserPage.module.scss';

import {
    selectEmailSelecionado,
    selectIdSelecionado,
    selectNomeSelecionado,
    selectAlterarSenha,
    selectUserType,
    selectErro,
    selectPedidos,
    submitUser,
    UserData,
    setUserType,
    setAlterarSenha,
    setEmailSelecionado,
    fetchUserPedidos,
    fetchUserInfo,
    PedidoType,
    UserType,
    UserTypeEnum,
    selectErroEmail
} from '../../Features/Admin/GerirUserSlice';

const UserEditForm = () => {
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const nomeSelecionado = useSelector(selectNomeSelecionado);
    const idSelecionado = useSelector(selectIdSelecionado);
    const alterarSenha = useSelector(selectAlterarSenha);
    const userType = useSelector(selectUserType) as UserTypeEnum;
    const pedidos = useSelector(selectPedidos);
    const emailSelecionado = useSelector(selectEmailSelecionado);

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
                <span>#ID {idSelecionado}</span>
            </div>
            <div className={styles['form-group']}>
                <span>Email {emailSelecionado}</span>
            </div>
            <div className={styles['form-group']}>
                <span>Nome {nomeSelecionado}</span>
            </div>
            <div className={styles['form-group']}>
                <label htmlFor="alterarSenha">Altear senha</label>
                <input
                    type="text"
                    id="alterarSenha"
                    placeholder="Digite nova senha"
                    value={alterarSenha}
                    onChange={(e) => {
                        dispatcher(setAlterarSenha(e.target.value));
                    }}
                />
            </div>
            <div className={styles['form-group']}>
                <h2>Tipo do usuário</h2>
                <div className={styles.radioOption}>
                    <span>Cliente:</span>
                    <input
                        type="radio"
                        id="user"
                        name="user"
                        value="user"
                        checked={userType === UserTypeEnum.user}
                        onChange={() => {
                            dispatcher(setUserType(UserTypeEnum.user));
                        }}
                    />
                </div>
                <div className={styles.radioOption}>
                    <span>Admin:</span>
                    <input
                        type="radio"
                        id="admin"
                        name="admin"
                        value="admin"
                        checked={userType === UserTypeEnum.admin}
                        onChange={() => {
                            dispatcher(setUserType(UserTypeEnum.admin));
                        }}
                    />
                </div>
                <div className={styles.radioOption}>
                    <span>Entregador:</span>
                    <input
                        type="radio"
                        id="entregador"
                        name="entregador"
                        value="entregador"
                        checked={userType === UserTypeEnum.entregador}
                        onChange={() => {
                            dispatcher(setUserType(UserTypeEnum.entregador));
                        }}
                    />
                </div>
                <div className={styles.radioOption}>
                    <span>Cozinheiro:</span>
                    <input
                        type="radio"
                        id="cozinheiro"
                        name="cozinheiro"
                        value="cozinheiro"
                        checked={userType === UserTypeEnum.cozinheiro}
                        onChange={() => {
                            dispatcher(setUserType(UserTypeEnum.cozinheiro));
                        }}
                    />
                </div>
            </div>
            <div className={styles['form-group']}>
                <button type="submit">Confirmar alterações</button>
            </div>
            <div className={styles.pedidos}>
                <h2>Pedidos de {nomeSelecionado}</h2>
                {pedidos.length > 0 ? (
                    pedidos.map((pedido: PedidoType) => {
                        return <></>;
                    })
                ) : (
                    <h2>O Usuário {nomeSelecionado} não tem pedidos</h2>
                )}
            </div>
        </form>
    );
};

const GerirUserPage = () => {
    const dispatcher = useDispatch();
    const emailSelecionado = useSelector(selectEmailSelecionado);
    const erro = useSelector(selectErro);
    const erroEmail = useSelector(selectErroEmail);
    const idSelecionado = useSelector(selectIdSelecionado);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatcher(fetchUserInfo(emailSelecionado));
    };

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
                    <div className={styles.erro}>
                        {erro && <div className={styles.erro}>{erroEmail}</div>}
                    </div>
                    <form onSubmit={handleSearch}>
                        <div className={styles['form-group']}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email do Usuário"
                                value={emailSelecionado}
                                onChange={(e) => {
                                    dispatcher(
                                        setEmailSelecionado(e.target.value)
                                    );
                                }}
                            />
                        </div>
                        <div className={styles['form-group']}>
                            <button type="submit">Buscar</button>
                        </div>
                    </form>
                </div>
                <div className={styles.container}>
                    <div className={styles.erro}>
                        {erro && <div className={styles.erro}>{erro}</div>}
                    </div>
                    <h1>Informações do Usuário</h1>
                    {idSelecionado === '' ? (
                        <h2>Nem um usuário selecionado</h2>
                    ) : (
                        <UserEditForm />
                    )}
                </div>
            </div>
        </>
    );
};

export default GerirUserPage;
