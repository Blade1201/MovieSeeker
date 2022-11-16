import React, {useState} from "react";


const Register = ({onFormSwitch}) => {

    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [formError, setFormError] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleUserInput = (name, value) => {
        setFormInput({
            ...formInput,
            [name]: value
        })
    }

    const validateFormInput = (event) => {
        event.preventDefault()
        let inputError = {
            email: "",
            password: "",
            confirmPassword: ""
        }


        if (!formInput.email && !formInput.password) {
            setFormError({
                ...inputError,
                email: "Hiteles e-mail cimet adjon meg",
                password: "A jelszó nem lehet üres"
            })
            return
        }


        if (!formInput.email) {
            setFormError({
                ...inputError,
                email: "Hiteles e-mail cimet adjon meg"
            })
            return
        }


        if (formInput.confirmPassword !== formInput.password) {
            setFormError({
                ...inputError,
                confirmPassword: "A jelszónak és a megerősitő jelszónak megegyezőnek kell lennie"
            })
            return
        }


        if (!formInput.password) {
            setFormError({
                ...inputError,
                password: "A jelszó nem lehet üres"
            })
            return
        }

        if (formInput.password.length < 8) {
            setFormError({
                ...inputError,
                password: "Legalább 8 karaktert adjon meg"
            })
            return
        }

        setFormError(inputError)

    }


    const [username, setUsername] = useState('')



    return (
        <div className="auth-form-container">

                        <h2>Regisztráció</h2>

            <form className="register-form" onSubmit={validateFormInput}>

                <label className="formLabel" htmlFor="username">Felhasználónév</label>
                <input className="formInput" value={username} onChange={(e) => setUsername(e.target.value)}
                       type="text" name="username" id="username" placeholder="Felhasználónév" />


                <label className="formLabel" htmlFor="email">E-mail</label>

                            <input
                                value={formInput.email}
                                onChange={({ target }) => {
                                    handleUserInput(target.name, target.value)
                                }}
                                name="email"
                                type="email"
                                className="formInput"
                                placeholder="e-mail@gmail.com"
                            />

                            <p className="error_message">{formError.email}</p>


                <label className="formLabel" htmlFor="password">Jelszó</label>

                            <input
                                value={formInput.password}
                                onChange={({ target }) => {
                                    handleUserInput(target.name, target.value)
                                }}
                                name="password"
                                type="password"
                                className="formInput"
                                placeholder="********"
                            />

                            <p className="error_message">{formError.password}</p>


                <label className="formLabel" htmlFor="password">Jelszó megismétlése</label>

                            <input
                                value={formInput.confirmPassword}
                                onChange={({ target }) => {
                                    handleUserInput(target.name, target.value)
                                }}
                                name="confirmPassword"
                                type="password"
                                className="formInput"
                                placeholder="********"
                            />

                            <p className="error_message">{formError.confirmPassword}</p>


                <button className="btn">

                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line"/>
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line"/>
                    </svg>

                    <span>Regisztrálás</span>

                </button>

                        </form>



            <button className="link-btn" onClick={() => onFormSwitch('login')}>Van már felhasználói fiókod? Jelentkezz be.</button>
            <a type="button" className="link-btn-return"  href="/">Mégsem</a>

        </div>
    )
}


export default Register;