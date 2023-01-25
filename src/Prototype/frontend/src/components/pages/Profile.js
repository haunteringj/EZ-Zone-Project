import "../../App.css";
import UserProfile from "../UserProfile";
import React from "react";
import Cards from "../Cards";
import Footer from "../Footer.js";
import NavBar from "../Navbar";
function Home(props) {
    return (
        <>
            <NavBar location={props.location} />
            <UserProfile />
            <Footer />
        </>
    );
}

export default Home;
