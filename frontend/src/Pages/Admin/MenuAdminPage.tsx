import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MenuAdminPage.module.scss";
import MenuNav from "../../Components/Admin/AdminNavbar";

const MenuAdminPage = () => {
    return (
        <>
            <MenuNav />
        </>
    );
}

export default MenuAdminPage;