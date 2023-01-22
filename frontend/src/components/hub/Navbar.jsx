import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../styles/hub/navbar.css';
import {Link} from "react-router-dom";
import user from '../../images/user.png';
import edit from '../../images/edit.png';
import logout_image from '../../images/log-out.png';
import LoggedInContext from "../../contexts/loggedin-context";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {loggedIn, setLoggedIn} = useContext(LoggedInContext);
    const [username, setUsername] = useState(localStorage.getItem("username") ?? "");

    let profileMenu = useRef();

    useEffect(() => {
        let userHandler = (e) => {
            if (!profileMenu.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", userHandler);

        return () => {
            document.removeEventListener("mousedown", userHandler);
        }
    });


    const [clicked, setClicked] = useState(false);

    let mobileMenu = useRef();


    useEffect(() => {
        let mobileHandler = (e) => {
            if (!mobileMenu.current.contains(e.target)) {
                setClicked(false);
            }
        };

        document.addEventListener("mousedown", mobileHandler);

        return () => {
            document.removeEventListener("mousedown", mobileHandler);
        }
    });


    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username");
        setLoggedIn(false);
        setUsername("");
    }


    return (
        <div className="movieseeker-navbar">

            <div className="movieseeker-navbar-links">


                <div className="movieseeker-navbar-links-title">

                    <h1> MovieSeeker </h1>

                </div>

                <div
                    className={`movieseeker-navbar-links__container ${clicked ? 'movieseeker-navbar-links__container active' : 'movieseeker-navbar-links__container'}`}>

                    <a href="#home"> Kezdőlap </a>
                    <a href="#movieseeker"> MovieSeeker? </a>
                    <a href="#possibilities"> Lehetőségek </a>
                    <a href="#premium-account"> Előfizetői Lehetőségek </a>
                    <Link className="about-team" to="/about"> A Csapat </Link>
                </div>


            </div>
            <div className="movieseeker-navbar__sign" ref={profileMenu}>
                {loggedIn ?
                    <div>
                        <div className="profile" onClick={() => {
                            setOpen(!open)
                        }}>
                            <img src={user} alt="not-found"></img>
                        </div>

                        <div className={`menu ${open ? 'active' : ''}`}>
                            <h3>{username}</h3>
                            <ul>
                                <li><img src={user} alt="not-found"/>
                                    <button> Profilom</button>
                                </li>
                                <li><img src={edit} alt="not-found"/>
                                    <button> Szerkesztés</button>
                                </li>
                                <li><img src={logout_image} alt="not-found"/>
                                    <button onClick={logout}> Kilépés</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    :
                    <Link className="login-button" to="/authentication"> Bejelentkezés </Link>
                }

            </div>


            <div ref={mobileMenu}>
                <div className="mobile" onClick={() => {
                    setClicked(!clicked)
                }}>
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"}> </i>
                </div>
            </div>


        </div>
    );
};

export default Navbar;