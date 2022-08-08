import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MenuAdminPage.module.scss';
import MenuNav from '../../Components/Admin/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../utils';

const MenuAdminPage = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        // set window title
        window.document.title = 'Menu Admin';
        if (!verifyToken()) {
            navigate('/');
        }
    }, []);
    return (
        <>
            <MenuNav />
        </>
    );
};

export default MenuAdminPage;
