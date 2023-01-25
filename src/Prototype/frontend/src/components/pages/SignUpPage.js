import "../../App.css";
import SignUp from "../SignUp";
import React from "react";
import Cards from "../Cards";
import Footer from "../Footer";
import NavBarLogin from "../NavbarLogin";

function SignUpPage() {
    return (
        <>
            <NavBarLogin />
            <SignUp />
            <Footer />
        </>
    );
}

export default SignUpPage;
