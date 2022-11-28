import React from 'react';
import '../../styles/hub/navbar.css';
import {Link} from "react-router-dom";
import isLoggedIn from "../../helpers/isLoggedIn";



const Navbar = () => {

    const logout = () => {
        localStorage.removeItem("token");
        isLoggedIn.bind(false);
    }


  return (
    <div className = "movieseeker-navbar">

      <div className = "movieseeker-navbar-links">


        <div className = "movieseeker-navbar-links-title">

          <h1> MovieSeeker </h1>

        </div>

        <div className = "movieseeker-navbar-links__container">

          <p><a href = "#home"> Kezdőlap </a></p>
          <p><a href = "#movieseeker"> MovieSeeker? </a></p>
          <p><a href = "#possibilities"> Lehetőségek </a></p>
          <p><a href = "#premium-account"> Előfizetői Lehetőségek </a></p>
          <p> <Link className = "about-team" to = "/about"> A Csapat </Link></p>
        </div>


      </div>


      <div className = "movieseeker-navbar__sign">
          <Link to = "/authentication"> Bejelentkezés </Link>
          <button onClick = { logout }> Kilépés </button>
      </div>


    </div>
  );
};

export default Navbar;