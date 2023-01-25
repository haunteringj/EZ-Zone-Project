import "../../App.css";
import ListenSpecific from "../ListenSpecific";
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer"
function Listen(props) {
  return (
    <div>
      <Navbar location={props.location} />
      <ListenSpecific />
      <Footer />
    </div>);
}

export default Listen;
