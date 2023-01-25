import "../../App.css";
import React from "react";
import Navbar from "../Navbar";
import HeroSection from "../HeroSection";
import Footer from "../Footer"
function Watch(props) {
  return (
    <div>
      <Navbar location={props.location} />
      <HeroSection />
      <Footer />
    </div>);
}

export default Watch;
