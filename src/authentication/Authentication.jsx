import React, {useState} from "react";
import Login from "./Login";
import Register from "./Register";
import "../styles/form.css";


const Authentication = () => {

    const [currentForm, setCurrentForm] = useState('login')

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }


    return(
        <div className="form">
        {
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
        </div>
    )
}

export default Authentication;