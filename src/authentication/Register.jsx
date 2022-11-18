import React, {useState} from "react";


const Register = ({ onFormSwitch }) => {

    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [formError, setFormError] = useState({
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

    const validateFormInput = (event) => {
        event.preventDefault();
        let inputError = {
            email: "",
            password: "",
            confirmPassword: ""
        };


        if ( !formInput.email && !formInput.password ) {
            setFormError({
                ...inputError,
                email: "Valós e-mail címet adjon meg!",
                password: "A jelszó nem lehet üres!"
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


        if ( formInput.password.length < 8 ) {
            setFormError({
                ...inputError,
                password: "Legalább 8 karaktert adjon meg!"
            });
            return;
        }


        const isWhitespace = /^(?=.*\s)/;
        if ( isWhitespace.test( formInput.password )) {
            setFormError({
                ...inputError,
                password: "Nem tartalmazhat szóközt!"
            });
            return;
        }


        const isContainsUppercase = /^(?=.*[A-Z])/;
        if ( !isContainsUppercase.test( formInput.password )) {
            setFormError({
                ...inputError,
                password: "Adjon meg legalább 1 nagybetűt!"
            });
            return;
        }


        const isContainsLowercase = /^(?=.*[a-z])/;
        if ( !isContainsLowercase.test( formInput.password )) {
            setFormError({
                ...inputError,
                password: "Adjon meg legalább 1 kisbetűt!"
            });
            return;
        }


        const isContainsNumber = /^(?=.*[0-9])/;
        if ( !isContainsNumber.test( formInput.password )) {
            setFormError({
                ...inputError,
                password: "Adjon meg legalább 1 számot!"
            });
            return;
        }


        const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/;
        if ( !isContainsSymbol.test( formInput.password )) {
            setFormError({
                ...inputError,
                password: "Adjon meg legalább 1 szimbólumot!"
            });
            return;
        }


        setFormError( inputError );

    };


    const [username, setUsername] = useState('');



    return (
        <div className = "authentication-form-container">

                        <h2> Regisztráció </h2>

            <form className = "register-form" onSubmit = { validateFormInput }>

                <label className = "label-form" htmlFor = "username"> Felhasználónév </label>

                            <input
                                value = { username }
                                onChange = {(e) => setUsername( e.target.value )}
                                name = "username"
                                type = "text"
                                className = "input-form"
                                placeholder = "Felhasználónév"
                            />


                <label className = "label-form" htmlFor = "email"> E-mail </label>

                            <input
                                value = { formInput.email }
                                onChange = {({ target }) => {
                                    handleUserInput( target.name, target.value )
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
                                onChange = {({ target }) => {
                                    handleUserInput( target.name, target.value )
                                }}
                                name = "password"
                                type = "password"
                                className = "input-form"
                                placeholder = "********"
                            />

                            <p className = "input-error-message"> { formError.password } </p>


                <label className = "label-form" htmlFor = "password"> Jelszó megismétlése </label>

                            <input
                                value={ formInput.confirmPassword }
                                onChange={({ target }) => {
                                    handleUserInput( target.name, target.value )
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



            <button className = "link-button" onClick = {() => onFormSwitch( 'login' )}> Van már felhasználói fiókod? Jelentkezz be. </button>
            <a type = "button" className = "link-button-return"  href = "/"> Mégsem </a>

        </div>
    );
};


export default Register;