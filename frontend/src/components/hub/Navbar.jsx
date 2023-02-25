import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../styles/hub/navbar.css';
import {Link} from "react-router-dom";
import user from '../../images/user.png';
import edit from '../../images/edit.png';
import logout_image from '../../images/log-out.png';
import userContext from "../../contexts/userContext";
import {HashLink} from "react-router-hash-link";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {loggedIn, setLoggedIn, name, setName, setRank, setId} = useContext(userContext);

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


    /*useEffect(() => {
        let mobileHandler = (e) => {
            if (!mobileMenu.current.contains(e.target)) {
                setClicked(false);
            }
        };

        document.addEventListener("mousedown", mobileHandler);

        return () => {
            document.removeEventListener("mousedown", mobileHandler);
        }
    });*/

        const [imageSrc, setImageSrc] = useState(null);
        const inputRef = useRef(null);

        function handleImageChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }

        function handleChooseFileClick() {
             inputRef.current.click();
         }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("name");
        setLoggedIn(false);
        setName("");
        setRank("G");
        setId(0);
    }


    return (
        <div className="movieseeker-navbar">

            <div className="movieseeker-navbar-links">


                <div className="movieseeker-navbar-links-title">

                    <h1> MovieSeeker </h1>

                </div>

                <div className={`movieseeker-navbar-links__container ${clicked ? "active" : ""}`}>
                    <HashLink to="#home" onClick={() => setClicked(false)}>Kezdőlap</HashLink>
                    <HashLink to="#movieseeker" onClick={() => setClicked(false)}>MovieSeeker</HashLink>
                    <HashLink to="#possibilities" onClick={() => setClicked(false)}>Lehetőségek</HashLink>
                    <HashLink to="#premium-account" onClick={() => setClicked(false)}>Előfizetői Lehetőségek</HashLink>
                    <Link className="about-team" to="/about"> A Csapat </Link>
                </div>


            </div>
            <div className="movieseeker-navbar__sign" ref={profileMenu}>
                {loggedIn ?
                    <div>
                        <div className="profile" onClick={() => {
                            setOpen(!open)
                        }}>
                            { imageSrc ? <img src={imageSrc} alt="not-found"></img> : <img src={user} alt="not-found"></img>}
                        </div>

                        <div className={`menu ${open ? 'active' : ''}`}>
                            <h3>{name}</h3>
                            <ul>
                                <li><img src={edit} alt="not-found"/>
                                    <button onClick={handleChooseFileClick}> Szerkesztés </button>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
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