import React from "react";
import HeaderComponent from "../components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <Outlet />
        </>
    )
}

export default Layout;