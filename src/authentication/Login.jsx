import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";



const Login = ({ onFormSwitch, setRedirect}) => {

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");


    const sendLoginAttempt = () => {

        axios.post("/authorization/login", {
            credential,
            password
        }).then(res => res.data)
            .then(data => {console.log(data);
                if (data["success"]) {
                    localStorage.setItem("token", data["token"]);
                    setRedirect(true);
                }
            })
            .catch(err => console.error(err["response"]["data"]));
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        sendLoginAttempt();
    };



    return (

        <div className = "authentication-form-container">

            <h2> Bejelentkezés </h2>

            <form className = "login-form" onSubmit = { handleSubmit }>

                <label className = "label-form" htmlFor = "credential"> E-mail / Felhasználónév </label>

                <input
                    value={ credential }
                    onChange={(e) => setCredential( e.target.value )}
                    type = "text"
                    name = "credential"
                    placeholder = "cím@domain"
                    className = "input-form"
                />

                <label className = "label-form" htmlFor = "password"> Jelszó </label>

                <input
                    value={ password }
                    onChange={(e) => setPassword( e.target.value )}
                    type = "password"
                    name = "password"
                    placeholder = "********"
                    className = "input-form"
                />


                <button className = "authentication-button">

                    <svg width = "180px" height = "60px" viewBox = "0 0 180 60" className = "border">
                        <polyline points = "179,1 179,59 1,59 1,1 179,1" className = "bg-line"/>
                        <polyline points = "179,1 179,59 1,59 1,1 179,1" className = "hl-line"/>
                    </svg>

                    <span> Bejelentkezés </span>

                </button>

            </form>



            <button className = "link-button" onClick = {() => onFormSwitch( 'register' )}>  Nincs még felhasználói fiókja? Regisztráljon. </button>
            <Link to = "/"> Mégsem </Link>

        </div>
    );
};

export default Login;