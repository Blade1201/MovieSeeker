import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../styles/hub/navbar.css';
import {Link} from "react-router-dom";
import admin from '../../images/admin.png';
import user from '../../images/user.png';
import edit from '../../images/edit.png';
import logout_image from '../../images/log-out.png';
import userContext from "../../contexts/userContext";
import {HashLink} from "react-router-hash-link";
import axios from "axios";
import {FavoriteContext} from "../../contexts/favoriteContext";
import {WatchListContext} from "../../contexts/watchlistContext";
import subscribe from "../../images/subscribe.png";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {
        loggedIn, setLoggedIn, name, setName, rank, setRank, setId, subscribed, setSubscribed, avatarPath, setAvatarPath
    } = useContext(userContext);
    const {clearFavorites} = useContext(FavoriteContext);
    const {clearWatchlist} = useContext(WatchListContext);

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

        const inputRef = useRef(null);

        async function handleImageChange(event) {
            const file = event.target.files[0];

            if (file["type"] === "image/gif" && !subscribed) {
                alert("GIF-et csak előfizető tölthet fel!");
                return;
            }

            const formData = new FormData();
            formData.append("avatar", file);

            try {
                const res = await axios.post("/upload/avatar", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                setAvatarPath(res["data"]["avatarPath"]);
            } catch (e) {
                alert("Hiba történt a kép feltöltése közben!");
            }
        }

        function handleChooseFileClick() {
             inputRef.current.click();
         }

    const logout = () => {
        axios.delete("/authentication", {withCredentials: true});
        setLoggedIn(false);
        setName("");
        setRank("G");
        setId(0);
        setSubscribed(false);
        setAvatarPath(null);
        clearFavorites();
        clearWatchlist();
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
                            { avatarPath ? <img src={`/upload/avatar/${avatarPath}`} alt="not-found"></img> : <img src={user} alt="not-found"></img>}
                        </div>

                        <div className={`menu ${open ? 'active' : ''}`}>
                            <h3>{name}</h3>
                            <ul>
                                {
                                    rank === "A" &&
                                    <li><img src={admin} alt="not-found"/>
                                        <Link to="/dashboard" className="subscribe"> Admin Panel </Link>
                                    </li>
                                }
                                {
                                    subscribed ||
                                    <li><img src={subscribe} alt="not-found"/>
                                        <Link to="/checkout" className="subscribe"> Előfizetés </Link>
                                    </li>
                                }
                                <li><img src={edit} alt="not-found"/>
                                    <button onClick={handleChooseFileClick}> Kép csere </button>
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


                <div className="mobile" onClick={() => {
                    setClicked(!clicked)
                }}>
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"}> </i>
                </div>


        </div>
    );
};

export default Navbar;