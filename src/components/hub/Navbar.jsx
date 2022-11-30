import React, {useEffect, useRef, useState} from 'react';
import '../../styles/hub/navbar.css';
import {Link} from "react-router-dom";
import isLoggedIn from "../../helpers/isLoggedIn";
import user from '../../images/user.png';
import edit from '../../images/edit.png';
import logout_image from '../../images/log-out.png';



const Navbar = () => {

    const [open, setOpen] = useState(false);

    let menuRef = useRef();


    useEffect(() => {
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });


    const logout = () => {
        localStorage.removeItem("token")
        isLoggedIn.bind(false);
    }




  return (
    <div className = "movieseeker-navbar">

      <div className = "movieseeker-navbar-links">


        <div className = "movieseeker-navbar-links-title">

          <h1> MovieSeeker </h1>

        </div>

        <div className = "movieseeker-navbar-links__container">

          <a href = "#home"> Kezdőlap </a>
          <a href = "#movieseeker"> MovieSeeker? </a>
          <a href = "#possibilities"> Lehetőségek </a>
          <a href = "#premium-account"> Előfizetői Lehetőségek </a>
          <Link className = "about-team" to = "/about"> A Csapat </Link>
        </div>


      </div>


      <div className = "movieseeker-navbar__sign" ref = { menuRef }>
          <Link className = "login-button" to = "/authentication"> Bejelentkezés </Link>


                 <div className = "profile" onClick = { ()=>{ setOpen(!open) } }>
                  <img src = {user} alt = "not-found"></img>
              </div>

              <div className = {`menu ${ open? 'active' : 'inactive' }`}>
                  <h3> Blade </h3>
                  <ul>
                      <li><img src = { user } alt="not-found"/> <button> Profilom </button> </li>
                      <li><img src = { edit } alt="not-found"/> <button > Szerkesztés </button> </li>
                      <li><img src = { logout_image } alt="not-found"/> <button onClick = {logout}> Kilépés </button> </li>
                  </ul>
              </div>


      </div>


    </div>
  );
};

export default Navbar;