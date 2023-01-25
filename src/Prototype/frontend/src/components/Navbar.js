import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "./Button";
import "./navbar.css";


function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("Movie")
  const [redirector, setRedirector] = useState(false)


  function changeSearch(e) {
    setSearchQuery(e.target.value)
  }
  function changeType(e) {
    console.log(e.target.value)
    setSearchType(e.target.value)
  }
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  function submitDirect(e) {
    setRedirector(true)
  }

  useEffect(() => {
    showButton();
  }, []);


  window.addEventListener("resize", showButton);

  var formStyle = {
    paddingTop: "27px"
  }
  const inputStyleSearch = {
    fontSize: "22px"
  }
  const inputStyleType = {
    fontSize: "22px",
    backgroundColor: "#323232",
    color: "white",
    border: "none"
  }
  if (props.location.pathname === "/dashboard") {
    formStyle = {
      display: "none"
    }
  }


  if (redirector) {
    console.log(searchType)
    return (
      <Redirect to={{
        pathname: '/dashboard',
        state: { search: searchQuery, type: searchType }
      }}
      />
    )
  } else {

    return (

      <>

        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/dashboard" className="navbar-logo" onClick={closeMobileMenu}>
              E-Zone <i className="fab fa-typo3" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <div className="search-container" style={formStyle}>
                  <form onSubmit={submitDirect} >
                    <input className="search-box" name="searched" style={inputStyleSearch} type="text" placeholder="Search..."
                      onChange={changeSearch} required />
                    <select name="type" onChange={changeType} style={inputStyleType}>
                      <option value="Movie">Movie</option>
                      <option value="TV Show">TV Show</option>
                      <option value="Album">Album</option>
                    </select>
                  </form >
                </div>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links" onClick={closeMobileMenu}>
                  Home
              </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
                  Profile
              </Link>
              </li>
              <li className="nav-item">

                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Log Out
                </Link>

              </li>
            </ul>

          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
