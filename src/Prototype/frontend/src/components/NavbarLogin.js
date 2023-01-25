import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./navbarLogin.css";
function NavbarLogin() {

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/dashboard" className="navbar-logo">
                        E-Zone <i className="fab fa-typo3" />
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default NavbarLogin;
