import * as React from 'react';
import {
    MetadePizzaData,
    selectMetades,
    setMetades
} from '../../Features/Pizza/MetadesPizzaSlice';
import styles from './IngredietePizza.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchIngredientes,
    IngredienteType,
    SelectCarregandoIngredientes,
    SelectIngredientes
} from '../../Features/CommonSlice';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils';
import { BACKEND_URL_NO_API } from '../../variables';

const IngredientePizza = (prop: IngredienteType & { numeroMetade: number }) => {
    const dispatch = useDispatch();
    const selecionarButton = () => {};
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
                {false ? 'Na pizza!' : 'Adicionar'}
            </button>
        </div>
    );
};

const MetadePizza = () => {
    const numero = 1;
    const dispatcher = useDispatch();
    const ingredientesSelecionados = [];
    const IngredietesDisponiveis = useSelector(SelectIngredientes);
    const carregando = useSelector(SelectCarregandoIngredientes);

    return (
        <>
            {carregando ? (
                <h2>Carregando...</h2>
            ) : (
                <>
                    <h2>{numero} º Metade</h2>
                    <div className={styles.ingredientesList}></div>
                </>
            )}
        </>
    );
};

const MetadesPizza = () => {
    const dispatcher = useDispatch();
    const metades = useSelector(selectMetades);

    const navigate = useNavigate();

    React.useEffect(() => {
        // set window title
        window.document.title = 'Gerir Pizzas';

        dispatcher(fetchIngredientes());

        if (!verifyToken()) {
            navigate('/');
        }
    }, [dispatcher]);

    return (
        <>
            <div className={styles.ingredietePizza}>
                <div className={styles.ingredietePizzaTitle}>
                    <h2>Metades da Pizza</h2>
                    <></>
                </div>
            </div>
        </>
    );
};

export default MetadesPizza;
