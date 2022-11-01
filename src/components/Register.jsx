import React, { useState } from "react";

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    //    console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Regisztráció</h2>

            <form className="register-form" onSubmit={handleSubmit}>

                <label htmlFor="username">Felhasználónév</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" placeholder="Felhasználónév" />
                <label htmlFor="email">E-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="e-mail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Jelszó</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Regisztrálás</button>

            </form>

            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Van már felhasználói fiókod? Jelentkezz be.</button>

        </div>
    )
}


export default Register;