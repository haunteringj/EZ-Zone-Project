import "../../App.css";
import Login from "../Login";
import React from "react";
import Cards from "../Cards";
import Footer from "../Footer";
import NavBarLogin from "../NavbarLogin";

function LoginPage() {
    return (
        <>
            <NavBarLogin />
            <Login />
            <Footer />
        </>
    );
}

export default LoginPage;
