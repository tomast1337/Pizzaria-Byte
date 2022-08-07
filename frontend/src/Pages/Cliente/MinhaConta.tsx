import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MinhaConta.module.scss';
import stylesBase from './clienteBase.module.scss';
import MenuNav from '../../Components/Cliente/MenuNav';

const MinhaConta = () => {
    const nome = 'Nome Teste';
    const email = 'test@testmail.com';
    const endereçoUltimaEntrega = 'Rua Teste, 123';
    const dataUltimaEntrega = '01/01/2020';
    const numeroPedido = '12345';

    return (
        <>
            <MenuNav />
            <div className={stylesBase.page}>
                <div className={stylesBase.container}>
                    <h1>Minha Conta</h1>
                    <div className={stylesBase.left}>
                        <h2>Dados Conta</h2>
                        <h3>Nome</h3>
                        <p>{nome}</p>
                        <h3>Email</h3>
                        <p>{email}</p>
                    </div>
                    <div className={stylesBase.right}>
                        <h2>Dados Ultima Entrega</h2>
                        <h3>Endereço</h3>
                        <p>{endereçoUltimaEntrega}</p>
                        <h3>Data</h3>
                        <p>{dataUltimaEntrega}</p>
                        <h3>Numero Pedido</h3>
                        <p>{numeroPedido}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MinhaConta;
