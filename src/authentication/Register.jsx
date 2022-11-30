import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";



const Register = ({ onFormSwitch, setRedirect }) => {

    const [formInput, setFormInput] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const [formError, setFormError] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value
        });
    };


    const validateFormInput = () => {

        let inputError = {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        };


        if ( !formInput.username && !formInput.email && !formInput.password ) {
            setFormError({
                ...inputError,
                username: "1 és 30 közötti hosszt adjon meg!",
                email: "Valós e-mail címet adjon meg!",
                password: "A jelszó nem lehet üres!"
            });
            return;
        }


        if ( !formInput.email && !formInput.password ) {
            setFormError({
                ...inputError,
                email: "Valós e-mail címet adjon meg!",
                password: "A jelszó nem lehet üres!"
            });
            return;
        }


        if ( formInput.username.length < 1 || formInput.username.length > 30 ) {
            setFormError({
                ...inputError,
                username: "1 és 30 közötti hosszt adjon meg!"
            });
            return;
        }


        if ( formInput.password.length < 8 && !formInput.email ) {
            setFormError({
                ...inputError,
                password: "Legalább 8 karaktert adjon meg!",
                email: "Valós e-mail címet adjon meg!"
            });
            return;
        }


        if ( !formInput.email ) {
            setFormError({
                ...inputError,
                email: "Valós e-mail címet adjon meg!"
            });
            return;
        }


        if ( !formInput.password ) {
            setFormError({
                ...inputError,
                password: "A jelszó nem lehet üres!"
            });
            return;
        }


        if ( formInput.confirmPassword !== formInput.password ) {
            setFormError({
                ...inputError,
                confirmPassword: "A jelszavak nem megeggyezőek!"
            });
            return;
        }


        if ( formInput.password.length < 8 || formInput.password.length > 30 ) {
            setFormError({
                ...inputError,
                password: "8 és 30 közötti hosszt adjon meg!"
            });
            return;
        }


        const isWhitespace = /^(?=.*\s)/;
        if ( isWhitespace.test(formInput.username) ) {
            setFormError({
                ...inputError,
                username: "Nem tartalmazhat szóközt!"
            });
            return;
        }

        if ( isWhitespace.test(formInput.password) ) {
            setFormError({
                ...inputError,
                password: "Nem tartalmazhat szóközt!"
            });
            return;
        }


        const isContainsUppercase = /^(?=.*[A-Z])/;
        if ( !isContainsUppercase.test(formInput.password) ) {
            setFormError({
                ...inputError,
                password: "Adjon meg legalább 1 nagybetűt!"
            });
            return;
        }


        const isContainsLowercase = /^(?=.*[a-z])/;
        if ( !isContainsLowercase.test(formInput.password) ) {
            setFormError({
                ...inputError,
                password: "Adjon meg legalább 1 kisbetűt!"
            });
            return;
        }


        const isContainsNumber = /^(?=.*[0-9])/;
        if ( !isContainsNumber.test(formInput.password) ) {
            setFormError({
                ...inputError,
                password: "Adjon meg legalább 1 számot!"
            });
            return;
        }


        const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/;
        if ( !isContainsSymbol.test(formInput.password) ) {
            setFormError({
                ...inputError,
                password: "Adjon meg legalább 1 szimbólumot!"
            });
            return;
        }

        setFormError(inputError);

        return true;

    };



    const sendRegistration = () => {
        const {username, email, password} = formInput;

        axios.post("/authorization//register", {
            username,
            email,
            password
        }).then(res => res.data)
            .then(data => {
                console.log(data);
                if(data["success"]) {
                    localStorage.setItem("token", data["token"]);
                    setRedirect(true);
                }
            })
            .catch(err => console.error(err["response"]["data"]));
    }



    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateFormInput()) return null;

        sendRegistration();
    }



    return (
        <div className = "authentication-form-container">

            <h2> Regisztráció </h2>

            <form className = "register-form" onSubmit = { handleSubmit }>

                <label className = "label-form" htmlFor = "username"> Felhasználónév </label>

                <input
                    value = { formInput.username }
                    onChange = { ( {target} ) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name = "username"
                    type = "text"
                    className = "input-form"
                    placeholder = "Felhasználónév"
                />

                <p className = "input-error-message"> { formError.username } </p>

                <label className = "label-form" htmlFor = "email"> E-mail </label>

                <input
                    value = { formInput.email }
                    onChange = { ( {target} ) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name = "email"
                    type = "email"
                    className = "input-form"
                    placeholder = "cím@domain"
                />

                <p className = "input-error-message"> { formError.email } </p>


                <label className = "label-form" htmlFor = "password"> Jelszó </label>

                <input
                    value = { formInput.password }
                    onChange = { ( {target} ) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name = "password"
                    type = "password"
                    className = "input-form"
                    placeholder = "********"
                />

                <p className = "input-error-message"> { formError.password } </p>


                <label className = "label-form" htmlFor = "password"> Jelszó megismétlése </label>

                <input
                    value = { formInput.confirmPassword }
                    onChange={ ( {target} ) => {
                        handleUserInput(target.name, target.value)
                    }}
                    name = "confirmPassword"
                    type = "password"
                    className = "input-form"
                    placeholder = "********"
                />

                <p className = "input-error-message"> { formError.confirmPassword } </p>


                <button className = "authentication-button">

                    <svg width = "180px" height = "60px" viewBox = "0 0 180 60" className = "border">
                        <polyline points = "179,1 179,59 1,59 1,1 179,1" className = "bg-line"/>
                        <polyline points = "179,1 179,59 1,59 1,1 179,1" className = "hl-line"/>
                    </svg>

                    <span> Regisztrálás </span>

                </button>

            </form>


            <button className = "link-button" onClick={ () => onFormSwitch('login') }> Van már felhasználói fiókja? Jelentkezzen be. </button>
            <Link className = "link-button-return" to = "/"> Mégsem </Link>

        </div>
    );
};


export default Register;