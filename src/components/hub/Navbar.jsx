import React from 'react';
import '../../styles/hub/navbar.css';
import {Link} from "react-router-dom";



const Navbar = () => {

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
          <p><a href = "#premium-account"> Előfizetői lehetőségek </a></p>

        </div>


      </div>


      <div className = "movieseeker-navbar__sign">
        <Link to = "/authentication"> Bejelentkezés </Link>
      </div>


    </div>
  );
};

export default Navbar;