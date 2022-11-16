import React, { useState } from "react";


const Login = ({onFormSwitch}) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
    //    console.log(email)
    }


    return (
        <div className="auth-form-container">

            <h2>Bejelentkezés</h2>

            <form className="login-form" onSubmit={handleSubmit}>

                <label className="formLabel" htmlFor="email">E-mail</label>
                <input className="formInput" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="e-mail@gmail.com" id="email" name="email" />

                <label className="formLabel" htmlFor="password">Jelszó</label>
                <input className="formInput" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />


                <button className="btn">
                    <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line"/>
                        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line"/>
                    </svg>

                    <span>Bejelentkezés</span>

                </button>

            </form>



            <button className="link-btn" onClick={() => onFormSwitch('register')}>Nincs még felhasználói fiókod? Regisztrálj.</button>
            <a type="button" className="link-btn-return"  href="/">Mégsem</a>

        </div>
    )
}

export default Login;