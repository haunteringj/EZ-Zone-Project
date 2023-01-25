import "../../App.css";
import React from "react";
import Footer from "../Footer.js";
import NavBar from "../Navbar.js";
import SearchBar from "../SearchBar.js";
import SuggestedMovies from "../SuggestedMovies.js";
import SuggestedTV from "../SuggestedTV.js";
import SuggestedAlbums from "../SuggestedAlbums";

function DashBoard(props) {
    const h1Style = {
        textAlign: "center",
        borderTop: "5px solid rgb(26, 23, 23)",
        borderBottom: "5px solid rgb(26, 23, 23)",
        paddingBottom: "5px",
        marginTop: "10px",
        marginBottom: "10px",
        backgroundColor: "rgb(28, 27, 27)",
        color: "white"
    }
    return (
        <div>
            <NavBar location={props.location} />
            <SearchBar location={props.location} />
            <h1 style={h1Style}> Suggested Movies </h1>
            <SuggestedMovies />
            <h1 style={h1Style}> Suggested Shows </h1>
            <SuggestedTV />
            <h1 style={h1Style}> Suggested Albums </h1>
            <SuggestedAlbums />
            <Footer />
        </div >
    )
}

export default DashBoard